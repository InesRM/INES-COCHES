<?php
try {
    $data = file_get_contents('../data/coches.json');
    $data = json_decode($data, true);

    if (!$data || !isset($data['coches'])) {
        throw new Exception('No se pudieron obtener los coches');
    }

    $coches = $data['coches'];
    $resultados = []; // Nuevo array para los resultados

    $search = $_GET['search'] ?? '';
    if ($search) {
        foreach ($coches as $coche) {
            if (stripos($coche['marca'], $search) !== false) { // Case-insensitive search
                $resultados[] = $coche; // Agregar al nuevo array
            }
        }
    } else {
        $resultados = $coches; // Si no hay búsqueda, devolver todos
    }

    echo json_encode($resultados); 
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

<?php 
try {
    $data = file_get_contents('../data/coches.json');
    $data = json_decode($data, true);

    if (!$data || !isset($data['coches'])) {
        throw new Exception('No se pudieron obtener los coches');
    }

    $coches = $data['coches'];
    $marcaSeleccionada = $_GET['marca'];
    $modeloSeleccionado = $_GET['modelo'];
    $cocheEncontrado = null;

    foreach ($coches as $coche) {
        if ($coche['marca'] === $marcaSeleccionada && $coche['modelo'] === $modeloSeleccionado) {
            $cocheEncontrado = $coche;
            break;
        }
    }

    if ($cocheEncontrado) {
        echo json_encode($cocheEncontrado);
    } else {
        echo json_encode(['error' => 'Coche no encontrado']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

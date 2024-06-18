<?php 
try {
    $data = file_get_contents('../data/coches.json');
    $data = json_decode($data, true);

    if (!$data || !isset($data['coches'])) {
        throw new Exception('No se pudieron obtener los coches');
    }

    // Crear un nuevo coche (este es solo un ejemplo, normalmente los datos vendrían de una solicitud POST)
    // $nuevoCoche = [
    //     'marca' => 'Tesla',
    //     'modelo' => 'Model 3',
    //     'year' => 2021,
    //     'precio' => 45000,
    //     'puertas' => 4,
    //     'color' => 'Azul'
    // ];

 $nuevoCoche = [
        'marca' => $_POST['marca'],
        'modelo' => $_POST['modelo'],
        'year' =>intval( $_POST['year']),
        'precio' =>floatval( $_POST['precio']),
        'color' => $_POST['color']
    ];

    $data['coches'][] = $nuevoCoche;

    // Guardar el archivo de nuevo
    if (file_put_contents('../data/coches.json', json_encode($data, JSON_PRETTY_PRINT)) === false) {
        throw new Exception('No se pudo guardar el coche');
    }

    echo json_encode(['success' => true, 'message' => 'Coche guardado correctamente']);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>







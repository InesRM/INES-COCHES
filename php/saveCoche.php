<?php
// saveCoche.php

// Obtener datos de la solicitud POST
$marca = $_POST['marca'];
$modelo = $_POST['modelo'];
$year = intval($_POST['year']);
$precio = floatval($_POST['precio']);
$color = $_POST['color'];

// Crear un array con los datos del coche
$coche = array(
    'marca' => $marca,
    'modelo' => $modelo,
    'year' => $year,
    'precio' => $precio,
    'color' => $color
);

// Leer el contenido del archivo coches.json
$jsonData = file_get_contents('../data/coches.json');
$data = json_decode($jsonData, true);

// Agregar el nuevo coche al array
$data['coches'][] = $coche;

// Guardar los datos actualizados en coches.json
file_put_contents('../data/coches.json', json_encode($data, JSON_PRETTY_PRINT));

// Responder con un mensaje de éxito
$response = array(
    'success' => true,
    'message' => 'Coche guardado correctamente'
);
echo json_encode($response);
?>

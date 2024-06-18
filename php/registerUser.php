<?php
// registerUser.php

// Obtener datos de la solicitud POST
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$usuario = $_POST['usuario'];
$clave = password_hash($_POST['clave'], PASSWORD_DEFAULT);

// Crear un array con los datos del usuario
$usuarioData = array(
    'nombre' => $nombre,
    'email' => $email,
    'usuario' => $usuario,
    'clave' => $clave
);

// Leer el contenido del archivo coches.json
$jsonData = file_get_contents('../data/coches.json');
$data = json_decode($jsonData, true);

// Verificar si el usuario ya existe
foreach ($data['usuarios'] as $existingUser) {
    if ($existingUser['usuario'] === $usuario) {
        $response = array(
            'success' => false,
            'message' => 'El usuario ya existe'
        );
        echo json_encode($response);
        exit;
    }
}

// Agregar el nuevo usuario al array
$data['usuarios'][] = $usuarioData;

// Guardar los datos actualizados en coches.json
file_put_contents('../data/coches.json', json_encode($data, JSON_PRETTY_PRINT));

// Responder con un mensaje de éxito
$response = array(
    'success' => true,
    'message' => 'Usuario registrado correctamente'
);
echo json_encode($response);
?>

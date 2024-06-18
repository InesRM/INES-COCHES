<?php
// loginUser.php

// Obtener datos de la solicitud POST
$usuario = $_POST['usuario'];
$clave = $_POST['clave'];

// Leer el contenido del archivo coches.json
$jsonData = file_get_contents('../data/coches.json');
$data = json_decode($jsonData, true);

// Verificar si el usuario existe y la contraseña es correcta
foreach ($data['usuarios'] as $existingUser) {
    if ($existingUser['usuario'] === $usuario) {
        if (password_verify($clave, $existingUser['clave'])) {
            $response = array(
                'success' => true,
                'message' => 'Inicio de sesión exitoso'
            );
            echo json_encode($response);
            exit;
        } else {
            $response = array(
                'success' => false,
                'message' => 'Contraseña incorrecta'
            );
            echo json_encode($response);
            exit;
        }
    }
}

// Si no se encontró el usuario
$response = array(
    'success' => false,
    'message' => 'Usuario no encontrado'
);
echo json_encode($response);
?>

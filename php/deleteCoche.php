<?php 
//Elimina el coche del archivo json de data/coches.json

// Incluimos el archivo json
$data = file_get_contents('../data/coches.json');
$data = json_decode($data, true);

//No hay id a eliminar, tan solo la combinacion marca-modelo
$marca = $_GET['marca'];
$modelo = $_GET['modelo'];

//Buscamos el coche a eliminar
$coche = null;
foreach($data['coches'] as $key => $value){
    if($value['marca'] == $marca && $value['modelo'] == $modelo){
        $coche = $value;
        break;
    }
}

//Si no se encontró el coche
if(!$coche){
    echo json_encode(['error' => 'No se encontró el coche']);
    return;
}

//Eliminamos el coche
unset($data['coches'][array_search($coche, $data['coches'])]);

//Guardamos los cambios
file_put_contents('../data/coches.json', json_encode($data));

?>
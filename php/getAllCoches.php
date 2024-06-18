<?php 
//script para listar todos los coches de ../data/coches.json

try{
  
    $data = file_get_contents('../data/coches.json');
    $data = json_decode($data, true);

    if (!$data || !isset($data['coches'])) {
        throw new Exception('No se pudieron obtener los coches');
    }

    $coches = $data['coches'];

  
    
    echo json_encode($coches);
}catch(Exception $e){
    echo json_encode(['error' => $e->getMessage()]);
}
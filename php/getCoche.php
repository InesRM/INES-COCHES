<?php 

//Esta versión era par la estructura de coches: {data ['coches' =>]}
try{
  
    $data = file_get_contents('../data/coches.json');
    $data = json_decode($data, true);

    if (!$data || !isset($data['coches'])) {
        throw new Exception('No se pudieron obtener los coches');
    }

    $coches = $data['coches'];
    echo json_encode($coches[rand(0, count($coches) - 1)]);

   
}catch(Exception $e){
    echo json_encode(['error' => $e->getMessage()]);
}

// try{
  
//     $cochesJson =file_get_contents('../data/coches.json');
//     $coches = json_decode($cochesJson, true);

//     if (!$coches) {
//         throw new Exception('No se pudieron obtener los coches');
//     }

//     echo json_encode($coches[rand(0, count($coches) - 1)]);




  
// }catch(Exception $e){
//     echo json_encode(['error' => $e->getMessage()]);
// }

?>

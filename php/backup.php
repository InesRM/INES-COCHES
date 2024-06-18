<?php 
//este archivo hará una copia de respaldo del archivo temp/users.json

//se debe crear un directorio backup que contenga la copia

//se lee el archivo JSON
$coches = file_get_contents('../tmp/copia.json');

//se crea un nombre de archivo único
$filename = 'backup/coches_'.date('Y-m-d_H-i-s').'.json';
//se crea el directorio si no existe
if (!file_exists('backup/')) {
    mkdir('backup', 0777, true);
}
//se copia el archivo
file_put_contents($filename, $coches);

//se envía un mensaje de éxito
echo 'Backup realizado con éxito';
?>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<?php
ini_set('memory_limit', '-1');
/*header("Content-Type: text/html;charset=utf-8");*/
function __autoload($classname) {
    $filename = "clases/" . $classname . ".class.php";
    include_once($filename);
}

$features = array();
$conmay = new maysql();
mysql_set_charset('utf8');
$conmay->conecta_vinom();
$qs ="SET NAMES 'utf8'";
$rs = $conmay->consulta($qs);
$c=0;
for ($i = 1; $i<=32; $i++){
    $nombre_archivo = "denue_".$i.".json"; 
    //hago la consulta
    $q = 'SELECT * FROM denue where ClaveEntidad = '.$i;
    $r = $conmay->consulta($q);
    $n = $conmay->filas($r);
    
    while ($fila = $conmay->vector($r)) {
        $c++;
        $add = $fila['TipoVialidad']." ".$fila['NombreVialidad'];
        $add .= ($fila['NumExterior']!== '')?" #".$fila['NumExterior']:"";
        $add .= ($fila['NumeroInterior']!== '')?" Int ".$fila['NumeroInterior']:"";
        $feature = array(
            'type' => 'Feature', 
            'geometry' => array(
            'type' => 'Point',
            'coordinates' => array((float)$fila['Longitud'], (float)$fila['Latitud'])
                        ),
          'properties' => array(
                'name' => htmlentities($fila['NombreUE']),
                'address' => htmlentities($add),
                'settlement' => htmlentities($fila['TipoAsentamientoHumano']." ".$fila['NombreAsentamientoHumano']),
                'cp' => $fila['CodigoPostal'],
                'id' => $fila['ID'],
                'category' => $fila['CodigoSCIAN'],
                'i' => $c
            //Other fields here, end without a comma
                )
            );
            array_push($features, $feature);
           // echo json_encode($feature)."<br>";
         }


    // Return markers as GeoJSON

    $geojson = array(
        'type'      => 'FeatureCollection',
        'features'  => $features
     );

     //echo json_encode($geojson);
    
    if($archivo = fopen("denue/".$nombre_archivo, "w")){
        if(fwrite($archivo, json_encode($geojson))){
            echo $nombre_archivo. " generado correctamente<br>";
        }else{
           echo $nombre_archivo. " No generado adecuadamente<br>";
        }
 
        fclose($archivo);
    }
}
$conmay->cierra_conexion();

?>
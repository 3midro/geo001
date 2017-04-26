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

$qs ="SET NAMES 'utf8'";
$q = 'SELECT * FROM denue where 1';
mysql_set_charset('utf8');
$conmay->conecta_vinom();
$rs = $conmay->consulta($qs);
$r = $conmay->consulta($q);
$n = $conmay->filas($r);
echo $n."<hr></hr>";
    $i=0;
    while ($fila = $conmay->vector($r)) {
        $i++;
       $feature = array(
        'type' => 'Feature', 
      'geometry' => array(
        'type' => 'Point',
        'coordinates' => array((float)$fila['Latitud'], (float)$fila['Longitud'])
            ),
      'properties' => array(
            'name' => htmlentities($fila['NombreUE']),
            'id' => $fila['ID'],
            'i' => $i
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

 echo json_encode($geojson);

$conmay->cierra_conexion();
































exit();









echo "Hola";
//header('Content-type: text/plain');
$username = "root";
$password = "";
$hostname = "localhost";	
$database = "dbvinom";
// Opens a connection to a mySQL server
$connection=mysql_connect ($hostname, $username, $password);
if (!$connection) {
  die('Not connected : ' . mysql_error());
}
// Set the active mySQL database
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}
// json output - insert table name below after "FROM"
$query = 'SELECT * FROM denue where 1';
$dbquery = mysql_query($query);
if(! $dbquery )
{
  die('Could not get data: ' . mysql_error());
}
$features = array();
while($row = mysql_fetch_assoc($dbquery)) {
    $feature = array(
        'type' => 'Feature', 
      'geometry' => array(
        'type' => 'Point',
        'coordinates' => array((float)$row['Latitud'], (float)$row['Longitud'])
            ),
      'properties' => array(
            'name' => $row['NombreUnidadEconomica']
        //Other fields here, end without a comma
            )
        );
    array_push($features, $feature);
};

// Parse the dbquery into geojson 
// ================================================
// ================================================
// Return markers as GeoJSON

$geojson = array(
    'type'      => 'FeatureCollection',
    'features'  => $features
 );

mysql_close($connection);
// // Return routing result
    //header("Content-Type:application/json",true);
    echo json_encode($geojson);
?>
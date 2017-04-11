<?php
header('Content-type: text/plain');
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
$query = 'SELECT * FROM denue where ';
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
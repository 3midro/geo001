<?php
    class busqueda{
        var $resp;
        
        function find($bbox, $conmay){
            $q = 'CALL getDenue('.$bbox["_southWest"]["lat"].', '.$bbox["_northEast"]["lat"].', '.$bbox["_southWest"]["lng"].', '.$bbox["_northEast"]["lng"].' );';
            $r = $conmay->consulta($q);
            $n = $conmay->filas($r);
            if ($n >= 1) {
                 $e = array();
                 while ($fila = $conmay->vector($r)) {
                     $feature = array(
                        "type" => "Feature",
						"geometry" => array(
							"type"=>"Point", 
							"coordinates"=> array(
								floatval($fila["longitud"]),
								floatval($fila["latitud"])
							)),
						"properties" => array(
							"id" => $fila["id"],
							"nombre" => utf8_encode($fila["nombre"]),
                            "SCIAN" => $fila["SCIAN"],
                            "activo" => $fila["activo"],
                            "isfav" => 0
						)
				);
                     array_push($e,$feature);
                }
                
                $features = array(
                    "type"=> "FeatureCollection",
                     "features"=> $e
                );
                $this->resp = array(
                    "code"=>200,
                    "geoUE" =>$features
                );
            }else{
                $this->resp = array(
                    "code"=>204,
                    "geoUE" => null
                );
            }
            
            return $this->resp;
        }
        
        function findFavs($bbox, $iuser, $conmay){
        $q = 'CALL getDenueFavs('.$bbox["_southWest"]["lat"].', '.$bbox["_northEast"]["lat"].', '.$bbox["_southWest"]["lng"].', '.$bbox["_northEast"]["lng"].',\''.$iuser.'\' );';
            $r = $conmay->consulta($q);
            $n = $conmay->filas($r);
            if ($n >= 1) {
                 $e = array();
                 while ($fila = $conmay->vector($r)) {
                     $feature = array(
                        "type" => "Feature",
						"geometry" => array(
							"type"=>"Point", 
							"coordinates"=> array(
								floatval($fila["longitud"]),
								floatval($fila["latitud"])
							)),
						"properties" => array(
							"id" => $fila["id"],
							"nombre" => utf8_encode($fila["nombre"]),
                            "SCIAN" => $fila["SCIAN"],
                            "activo" => $fila["activo"],
                            "isfav" => $fila["isfav"]
						)
				);
                     array_push($e,$feature);
                }
                
                $features = array(
                    "type"=> "FeatureCollection",
                     "features"=> $e
                );
                $this->resp = array(
                    "code"=>200,
                    "geoUE" =>$features
                );
            }else{
                $this->resp = array(
                    "code"=>204,
                    "geoUE" => null
                );
            }
            
            return $this->resp;
        }
    }
?>
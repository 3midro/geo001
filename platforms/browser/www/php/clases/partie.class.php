<?php

class partie {
    var $resp;
    
    function create ($uuid, $conmay, $idfiesta, $tf, $fh, $n, $d, $o){
        $q = 'INSERT INTO fiestas (idfiesta, idtipofiesta, uuid_owner, fecha, nombre, direccion, observaciones) 
        VALUES ("'.$idfiesta.'", '.$tf.', "'.$uuid.'", "'.$fh.'", "'.stripslashes(utf8_encode($n)).'", "'.stripslashes(utf8_encode($d)).'", "'.stripslashes(utf8_encode($o)).'");';
        $conmay->conecta_vinom();
        $r = $conmay->consulta($q);
		$n = $conmay->f_afectadas($r);
		if ($n == 1){
            // se inserto
            $this->resp = array ("code"=>200,
                    "msj_u" => "Excelente! has creado ". $n ." fiesta correctamente, ahora dinos lo que necesitas para que sea la fiesta mas genial",
                    "msj_i" => "Fiestas insertada correctamente",
                    //"fiestas"=> $f,
					"q"=>$q
                    );
        }else{
            // no se inserto
            $this->resp = array(
				"code"=>204,
                "msj_u" =>"No hemos podido crear la fiesta adecuadamente, intentalo nuevamente :(",
				"msj_i" => "No se creo la fiesta",
                "q" => $q
               );
        }
        
        $conmay->cierra_conexion();
        return $this->resp;
    }
	
    function read ($uuid, $conmay){
        $q = 'SELECT idfiesta, tipofiesta, DATE_FORMAT(fecha, "%d.%m.%Y") as fecha, DATE_FORMAT(fecha, "%h:%i") as hora, nombre, direccion, observaciones, color  FROM fiestas f, cat_tipofiesta tf 
				WHERE f.idtipofiesta = tf.idtipofiesta
				AND uuid_owner = "'.$uuid.'"
				AND CAST(fecha AS DATE) >= DATE_ADD(CURDATE(), INTERVAL -3 DAY);';
        // sin la restriccion de los 3 dias
         $q = 'SELECT idfiesta, tipofiesta, DATE_FORMAT(fecha, "%d.%m.%Y") as fecha, DATE_FORMAT(fecha, "%h:%i") as hora, nombre, direccion, observaciones, color  FROM fiestas f, cat_tipofiesta tf 
				WHERE f.idtipofiesta = tf.idtipofiesta
				AND uuid_owner = "'.$uuid.'";';
        
		//solo lista las vigentes y las pasadas hace 3 dias, despues de eso ya no las listará
 		$conmay->conecta_vinom();
        $r = $conmay->consulta($q);
		$n = $conmay->filas($r);
		if ($n > 0){
			//todo ok enlisto las fiestas :)
			$f = array(); 
			while ($fila = $conmay->vector($r)) {
				$info = array(
                        "idfiesta" => $fila["idfiesta"],
					 	"tipofiesta" => $fila["tipofiesta"],
						"fecha" => $fila["fecha"],
                        "hora" => $fila["hora"],
						"nombre" => utf8_encode($fila["nombre"]),
						"direccion" => utf8_encode($fila["direccion"]),
						"observaciones" => utf8_encode($fila["observaciones"]),
                        "color" => utf8_encode($fila["color"])
						);
				array_push($f,$info); 
			 }
			$this->resp = array ("code"=>200,
                    "msj_u" => "Se han encontrado ". $n ." fiestas",
                    "msj_i" => "Fiestas listadas correctamente",
                    "fiestas"=> $f,
					"q"=>$q
                    );
		} else {
            $this->resp = array(
				"code"=>204,
                "msj_u" =>"Organiza una fiesta!!",
				"msj_i" => "No hay fiestas para este usuario",
                "q" => $q
               );
		}
		$conmay->cierra_conexion();
        return $this->resp;
    }
    
        

    
}
    
?>
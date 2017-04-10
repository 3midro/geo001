<?php

class amiguis {
    var $resp;

    function fav($conmay, $uuid, $folio, $isfav){
        if ($isfav == 'favorite_border'){
            $st = 1;
            $isfav = 'favorite';
        }else{
            $st = 'NULL';
            $isfav = 'favorite_border';
        }
        //$isfav = ($isfav == 'favorite_border')?1:'NULL';
        $q = 'UPDATE cat_amiguis SET isfav = '.$st.' WHERE folio='.$folio.' AND uuid="'.$uuid.'";';
        $conmay->conecta_vinom();
        $r = $conmay->consulta($q);
        $n = $conmay->f_afectadas($r);
            if ($n == 1){
                 $this->resp = array ("code"=>200,
                    "msj_u" => "Excelente! has actualizado ". $n ." amigui correctamente",
                    "msj_i" => "Amigui fav /no fav correctamente",
                    "estatus" => $isfav,
                    "q"=>$q
                    );
            }else{
                 $this->resp = array(
                    "code"=>204,
                    "msj_u" => "No se actualizo el estatus de favorito de tu amigui correctamente, intentalo de nuevo",
                    "msj_i" => "No se almaceno fav / no fav",
                    "q" => $q
                   );
            }
        $conmay->cierra_conexion();
        return $this->resp;
    }
    
    function put($conmay, $cel, $alias, $uuid){
        //compruebo si ya es amigui-duper
        $q = 'SELECT celular FROM cat_amiguis WHERE celular = "'.$cel.'" AND uuid = "'.$uuid.'" OR alias = "'.$alias.'";';
        $conmay->conecta_vinom();
        $r = $conmay->consulta($q);
		$n = $conmay->filas($r);
        $a = ($n > 0) ? true : false; 
        if (!$a){
            $q = 'INSERT INTO cat_amiguis (celular, alias, uuid) VALUES ("'.$cel.'","'.$alias.'","'.$uuid.'");';
            //$conmay->conecta_vinom();
            $r = $conmay->consulta($q);
            $n = $conmay->f_afectadas($r);
            if ($n == 1){
                 $this->resp = array ("code"=>200,
                    "msj_u" => "Excelente! has guardado ". $n ." amigui correctamente",
                    "msj_i" => "Amigui guardado correctamente",
                    "q"=>$q
                    );
            }else{
                 $this->resp = array(
                    "code"=>204,
                    "msj_u" => "No se guardo ".$alias." correctamente, intentalo de nuevo",
                    "msj_i" => "No se almaceno",
                    "q" => $a
                   );
            }
        }else{
            //ya estaba guardado como tu amigui :)
            $this->resp = array(
				"code"=>204,
                "msj_u" => $alias." ya era tu amigui",
				"msj_i" => "ya estaba en el catalogo de amigos"
               );
             return $this->resp;
        }
        
        $conmay->cierra_conexion();
        return $this->resp;
    } 

    function get($conmay, $uuid, $idfiesta){
        $q = "SELECT a.folio, a.celular, a.alias, 
        IF(m.celular IS NOT NULL,1,0) registered, 
        IF(fi.folio IS NOT NULL,'isinvitado','isNotinvitado') invitado, 
        IF (fi.asistira IS NULL,0,fi.asistira) asistira, 
        IF (a.isfav IS NOT NULL,'favorite','favorite_border') fav, 
        IF (fi.pagara IS NOT NULL,1,0) pagara 
        FROM cat_amiguis a 
        LEFT JOIN membresias m ON m.celular = a.celular
        LEFT JOIN  fiesta_has_invitados fi ON fi.idfiesta = '".$idfiesta."' AND fi.folio=a.folio
        WHERE a.uuid = '".$uuid."'
        ORDER BY fav, alias ASC;";
        //return array("q"=>$q);
        $conmay->conecta_vinom();
        $r = $conmay->consulta($q);
        
        //exit();
        $n = $conmay->filas($r);
        
        
        
		if ($n > 0){
            $f = array(); 
			while ($fila = $conmay->vector($r)) {
                switch($fila["asistira"]){
                    case 1: $fila["asistira"]='noAsistira'; break;
                    case 2: $fila["asistira"]='mayAsistira'; break;
                    case 3: $fila["asistira"]='asistira'; break;
                    default: 
                        $fila["asistira"]= ($fila["invitado"]=='isinvitado')?'':'uk-hidden';
                        break;
                }
				$info = array(
                        "folio" => $fila["folio"],
					 	"celular" => $fila["celular"],
						"alias" => utf8_encode($fila["alias"]),
                        "registrado" => $fila["registered"],
						"invitado" =>$fila["invitado"],
						"asistira" =>$fila["asistira"],
                        "pagara" =>$fila["pagara"],
                        "fav" =>$fila["fav"]
						);
				array_push($f,$info); 
			 }
			$this->resp = array ("code"=>200,
                    "msj_u" => "Se han encontrado ". $n ." amiguis",
                    "msj_i" => "Amiguis listados correctamente",
                    "amiguis" => $f,
                    "q"=>$q
                    );
        }else{
            $this->resp = array(
				"code"=>204,
                "msj_u" =>"Agrega a tus amiguis!!",
				"msj_i" => "No hay amiguis para este usuario",
                "q" => $q
               );
        }
        
        $conmay->cierra_conexion();
        return $this->resp;
    }
    
    function del($conmay, $uuid, $folio){
        $conmay->conecta_vinom();
        $q = 'SET AUTOCOMMIT=0;';
        $r = $conmay->consulta($q);
        $q = 'BEGIN;';
        $r = $conmay->consulta($q);
        //primero lo borro de catalogo de amiguis
        $q= 'DELETE FROM cat_amiguis WHERE folio='.$folio.' AND uuid="'.$uuid.'";';
        $r = $conmay->consulta($q);
        // despues lo borro de las fiestas a las que lo invite 
        $q = 'DELETE FROM fiesta_has_invitados WHERE folio='.$folio.';';
        $r = $conmay->consulta($q);
        //hago commit o rollback dependiendo el resultado
        if ($r){
            $q='COMMIT;';
            $this->resp = array ("code"=>200,
                "msj_u" => "Se han eliminado los registros de tu amigui",
                "msj_i" => "Amigui eliminado correctamente",
            );
        }else{
            $q='ROLLBACK;';
            $this->resp = array(
                "code"=>204,
                "msj_u" =>"Fallo al eliminar a tu amigui",
				"msj_i" => "No se pudo eliminar el amigui, se realizo rollback",
           );
        }
        $r = $conmay->consulta($q);
        $conmay->cierra_conexion();
        return $this->resp;
    }
    
    function asistira($conmay, $idfiesta, $folio, $estatus){
        switch ($estatus){
            case "pendiente": $a = 3; $nc = 'asistira'; break;
            case "asistira": $a = 2; $nc = 'mayAsistira'; break;
            case "mayAsistira": $a = 1; $nc = 'noAsistira'; break;
            case "noAsistira": $a = 'NULL'; $nc = ''; break;
            default: $a = 'NULL'; $nc = ''; break;
        }
        $q = 'UPDATE fiesta_has_invitados SET asistira='.$a.' WHERE idfiesta = "'.$idfiesta.'" AND folio = '.$folio.';';
        $conmay->conecta_vinom();
        $r = $conmay->consulta($q);
        $n = $conmay->f_afectadas($r);
            if ($n == 1){
                 $this->resp = array ("code"=>200,
                    "msj_u" => "Excelente! se ha guardado la asistencia de ". $n ." amigui correctamente  ",
                    "msj_i" => "Amigui asistencia almacvenada correctamente",
                    "newclase" => $nc,
                    "q"=>$q
                    );
            }else{
                 $this->resp = array(
                    "code"=>204,
                    "msj_u" => "No se actualizo el estatus de asistencia de tu amigui correctamente, intentalo de nuevo",
                    "msj_i" => "No se almaceno asistencia",
                    "q" => $q
                   );
            }
        $conmay->cierra_conexion();
        return $this->resp;
    }
}
    
?>
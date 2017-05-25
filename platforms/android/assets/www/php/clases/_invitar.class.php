<?php

class invitar {
    var $resp;
    
    function setInvitar($conmay, $idfiesta, $folio, $invitar, $uuid){
        $q = ($invitar == "true")?'INSERT INTO fiesta_has_invitados (idfiesta, folio) VALUES ("'.$idfiesta.'", '.$folio.');': 'DELETE FROM fiesta_has_invitados WHERE idfiesta ="'.$idfiesta.'" AND folio = '.$folio.';';
        $conmay->conecta_vinom();
        $r = $conmay->consulta($q);
        $n = $conmay->f_afectadas($r);
        if ($n == 1){
             $this->resp = array ("code"=>200,
                    "msj_u" => "Excelente! se ha invitado/desinvitado a tu amigui adecuadamente",
                    "msj_i" => "Amigui invitado/desinvitado correctamente",
                    "q"=>$q
                    );
        }else{
            //fallo al insertar o borrar
             $this->resp = array(
				"code"=>204,
                "msj_u" =>"No hemos podido invitar/desinvitar a tu amigui, intentalo nuevamente :(",
				"msj_i" => "No se modifico su amigui",
                "q" => $q
               );
        }
        $conmay->cierra_conexion();
        return $this->resp;
        
    }
    
  
}
    
?>
<?php

class toque {
    var $resp;
    
	
    function add ($usr, $denue, $conmay){
        $q = 'INSERT INTO  bitacoratoques (denue_ID, uuid) VALUES ('.$denue.',"'.$usr.'");';
 		$conmay->conecta_vinom();
        $r = $conmay->consulta($q);
		$n = $conmay->f_afectadas($r);
		if ($n === 1){
			//todo ok
			 $this->resp = array ("code"=>200,
                    "msj_u" => "Nosotros le haremos saber de tú interés!!",
                    "msj_i" => "Se guardo en bitacora el toque",
                   	"q"=>$q,
             );
		} else {
            $this->resp = array(
				"code"=>400,
                "msj_u" =>"Hubo un error al notificarle al cliente del interes",
				"msj_i" => "No se guardo en bitacora el toque",
                "q" => $q
               );
		}
		$conmay->cierra_conexion();
        return $this->resp;
    }
    
       

    
}
    
?>
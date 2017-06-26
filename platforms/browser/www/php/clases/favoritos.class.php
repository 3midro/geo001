<?php
    class favoritos{
        var $resp;
        
        function manageFav($isuer, $denue){
            $q = 'SELECT setFav('.$iuser.', '.$denue.');';
            $r = $conmay->consulta($q);
            $n = $conmay->filas($r);
            if ($n >= 1) {
                while ($fila = $conmay->vector($r)) {
                    $icn=($fila["setFav"] == 1)?'favorite':'favorite_border';
                }
                $this->resp = array(
                    "code"=>200,
                    "icono" => $icn
                );
            }else{
                $this->resp = array(
                    "code"=>204
                );
            }
            
            return $this->resp;
        }
    }
?>
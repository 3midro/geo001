<?php
    class busqueda{
        var $resp;
        
        function find($bbox, $conmay){
            $q = 'SELECT * FROM denue WHERE (X(geom) >= '.$bbox["_southWest"]["lat"].' AND X(geom) <= '.$bbox["_northEast"]["lat"].' ) AND (Y(geom) >= '.$bbox["_southWest"]["lng"].' AND Y(geom) <= '.$bbox["_northEast"]["lng"].');';
            $r = $conmay->consulta($q);
            $n = $conmay->filas($r);*/
            $this->resp = array(
                "code"=>200,
                "lugares"=>$n
            );
            return $this->resp;
        }
    }
?>
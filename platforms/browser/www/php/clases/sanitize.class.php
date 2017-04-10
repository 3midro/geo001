<?php
class sanitize
{
	# Detarmina si revisamos los parametros de post o get
	private $action="POST";
	# Contiene el array con los nombre de los campos con el tipo de revision
	public $values;
 
	public function __construct()
	{
	}
 
	/**
	 * Funcion que determina si la recepcion de parametros es por post o get
	 * Tiene que recibir: post|get
	 */
	public function setAction($value)
	{
		if(strtoupper($value)=="POST" || strtoupper($value)=="GET")
			$this->action=strtoupper($value);
		return $this;
	}
 
	/**
	 * Funcion para recibir un array con los nombre de los campos y tipo de
	 * revision.
	 *	array("id"=>array("int"),"name"=>array("str_nohtml",1000))
	 */
	public function setValues($value)
	{
		$this->values=$value;
		return $this;
	}
 
	/**
	 * Funcion que sanitiza los valor recibidos en post o get con los valores
	 * recibidos en el array values
	 */
	public function sanitize()
	{
		if(count($this->values))
		{
			# Buscamos los valores de $data dentro de las keys
			# Devuelve unicamente las $key=>$value que coinciden con el contenido de $data
			if($this->action=="POST")
				$data=array_intersect_key($_POST, $this->values);
			else
				$data=array_intersect_key($_GET, $this->values);
 
			foreach($data as $key => $value)
			{
				$values1=$data[$key];
				$values2="";
				if(count($this->values[$key])>1)
					$values2=$this->values[$key][1];
 
				# Llamamos a la funcion recibida por el segundo parametro de
				# $this->values, y la respuesta la ponemos en la variable
				# $_POST[...]
				# Enviamos un array con la lista de parametros
				$_POST[$key]=call_user_func(array("sanitize",$this->values[$key][0]),$values1,$values2);
			}
		}
	}
 
	/**
	 * Devuelve la cadena formateada con las comillas y caracteres html
	 */
	public function str_nohtml($value, $length=0)
	{
		$result=htmlentities(trim($value),ENT_QUOTES);
		if($length>0 && strlen($result)>$length)
			$result=substr($result,0,$length);
		return $result;
	}
 
	/**
	 * Devuelve la ip si es correcta.
	 * Vacio si no es una ip correcta
	 */
	public function ip($value)
	{
		return filter_var($value,FILTER_VALIDATE_IP);
	}
 
	/**
	 * Funcion para sanitizar un entero
	 * Devuelve el valor entero del valor recibido.
	 * Devuelve 0 si:
	 *	- es el valor recibido
	 *	- si no es un valor entero
	 */
	public function int($value)
	{
		return (int)$value;
	}
 
	/**
	 * Funcion para sanitizar un valor smallint
	 * Tiene que recibir:
	 *	$value
	 *	$unsigned [true|false]: Determina si el tipo es unsigned
	 * Devuelve el valor recibido si esta entre:
	 *	-32.768 y 32.767
	 * Devuelve 0 si no esta entre los valores indicados
	 */
	public function smallint($value,$unsigned=false)
	{
		if($unsigned)
		{
			if($value>=0 && $value<=65535)
				return $value;
		}else{
			if($value>=-32768 && $value<=32767)
				return $value;
		}
		return 0;
	}
 
	/**
	 * Funcion para sanitizar un valor mediumint
	 * Tiene que recibir:
	 *	$value
	 *	$unsigned [true|false]: Determina si el tipo es unsigned
	 * Devuelve el valor recibido si esta entre:
	 *	-8.388.608 y 8.388.607
	 * Devuelve 0 si no esta los valores indicados
	 */
	public function mediumint($value,$unsigned=false)
	{
		if($unsigned)
		{
			if($value>=0 && $value<=16777215)
				return $value;
		}else{
			if($value>=-8388608 && $value<=8388607)
				return $value;
		}
		return 0;
	}
 
	/**
	 * Funcion que valida un valor del tipo tinyint. Tiene que ser entre 0 y 255
	 */
	public function tinyint($value)
	{
		if($value>=0 && $value<=255)
			return $value;
		return 0;
	}
 
	/**
	 * Funcion para sanitizar un valor float
	 * Devuelve el valor recibido si es un float.
	 * Devuelve 0 si:
	 *	- es el valor recibido
	 *	- si no es un valor entero
	 */
	public function float($value)
	{
		return (float)$value;
	}
 
	/**
	 * Funcion para sanitizar un valor boleano
	 * Devuelve 1 si el valor es: true, TRUE, 1, "1", "yes", "on"
	 * Devuelve 0 si es otro valor
	 */
	public function boolean($value)
	{
		if(filter_var($value, FILTER_VALIDATE_BOOLEAN))
			return 1;
		return 0;
	}
 
	/**
	 * Funcion para sanitizar un valor money de sql server
	 * Devuelve el valor recibido si esta entre:
	 *	-922.337.203.685.477,5808 y 922.337.203.685.477,5807
	 * Devuelve 0 si no esta los valores indicados
	 */
	public function money($value)
	{
		if($value>=-922337203685477.5808 && $value<=922337203685477.5807)
			return $value;
		return 0;
	}
 
	/**
	 * Funcion para sanitiar una cuenta de correo
	 * Devuelve la cuenta de correo si es correcto.
	 * Si es incorrecta o la longitud es superior a la especificada devuelve
	 * vacio
	 */
	public function email($value,$length=0)
	{
		$result=filter_var($value, FILTER_VALIDATE_EMAIL);
		if($length>0 && strlen($result)>$length)
			$result="";
		return $result;
	}
 
	/** 
	 * Funcion para validar una url del tipo http://www.lwp.es
	 * Devuelve la url o vacio si no es una url correcta
	 */
	public function url($value)
	{
		return filter_var(trim($value), FILTER_VALIDATE_URL, FILTER_FLAG_HOST_REQUIRED);
	}
 
	/**
	 * Devuelve la cadena reemplazando las comillas simples por dos comillas simples
	 * Tiene que recibir:
	 *	$value
	 *	$length -> Logitud maxima de la cadena: 0 sin limite
	 * Sample:
	 *	a'a -> a''a
	 */
	public function sqlserver($value, $length=0)
	{
		$result=str_replace("'","''",trim($value));
		if($length>0 && strlen($result)>$length)
			$result=substr($result,0,$length);
		return $result;
	}
 
	/**
	 * Desace el reemplazo para una cadena de sql server. Reemplaza las dos
	 * comillas simples por una sola comilla simple
	 * Sample:
	 *	a''a -> a'a
	 */
	public function sqlserverUndo($value)
	{
		return str_replace("''","'",trim($value));
	}
 
	/**
	 * Devuelve la cadena poniendo una contrabarra delante de una comilla simple
	 * y una comilla doble.
	 * Tiene que recibir:
	 *	$value
	 *	$length -> Logitud maxima de la cadena: 0 sin limite
	 * Sample:
	 *	a'a"a -> a\'a\"a
	 */
	public function mysql($value, $length=0)
	{
		$result=addslashes(trim($value));
		//$result=str_replace("'","\'",str_replace("\"","\\\"",trim($value)));
		if($length>0 && strlen($result)>$length)
			$result=substr($result,0,$length);
		return $result;
	}
 
	/**
	 * Desace el reemplazo para una cadena de mysql. Reemplaza las comillas simples
	 * y dobles escadas.
	 * Sample:
	 *	a\'a\"a -> a'a"a
	 */
	public function mysqlUndo($value)
	{
		return stripslashes(trim($value));
		//return str_replace("\'","'",str_replace("\\\"","\"",trim($value)));
	}
 
	/**
	 * Sanitiza una fecha en formato ingles del tipo:
	 *	yy/m/d o yyyy/mm/dd
	 *	yy-m-d o yyyy-mm-dd
	 * Devuelve la fecha si es correcta o vacio si no es correcta
	 */
	public function dateEn($value)
	{
		$pattern="/^((19|20)?[0-9]{2})[\/|-](0?[1-9]|[1][12])[\/|-](0?[1-9]|[12][0-9]|[3][01])$/";
		if(preg_match($pattern,$value))
			return $value;
		return "";
	}
 
	/**
	 * Sanitiza una fecha en formato español del tipo:
	 *	d/m/yy o dd/mm/yyyy
	 *	d-m-yy o dd-mm-yyyy
	 * Devuelve la fecha si es correcta o vacio si no es correcta
	 */
	public function dateEs($value)
	{
		$pattern="/^((19|20)?[0-9]{2})[\/|-](0?[1-9]|[1][12])[\/|-](0?[1-9]|[12][0-9]|[3][01])$/";
		if(preg_match($pattern,$value))
			return $value;
		return "";
	}
 
	/**
	 * Sanitiza una hora
	 * Devuelve la hora si es correcta o 0 si no es correcta
	 */
	public function hour($value)
	{
		$pattern="/^([0-5]?[0-9])$/";
		if(preg_match($pattern,$value))
			return $value;
		return "0";
	}
 
	/**
	 * Sanitiza una hora:minutos
	 * Devuelve la hora:minutos si es correcta o 0 si no es correcta
	 */
	public function hourMinute($value)
	{
		$pattern="/^([0-5]?[0-9]):([0-5]?[0-9])$/";
		if(preg_match($pattern,$value))
			return $value;
		return "0";
	}
    
    
    public function alphanumeric($value)
    {
       if (ctype_alnum($value)) 
           return $value;
        return "0";
    }
    
    public function latitude($value){
        //$pattern="/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?)$/";
        $pattern = "/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/";
        if(preg_match($pattern,$value))
			return $value;
		return "0";
    }
    
    public function longitude($value){
        //$pattern="/^[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/";
        $pattern = "/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$/";
        if(preg_match($pattern,$value))
			return $value;
		return "0";
    }
}
?>
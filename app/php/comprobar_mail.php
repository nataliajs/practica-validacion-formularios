<?php

//uso de CORS
header("Access-Control-Allow-Origin: *");
//recupero el valor de mail del formulario
$mail = trim(strtolower($_GET['email']));
//conecto con la base de datos
$conex= new mysqli('localhost','nataliajimenez_c','441983','nataliajimenez_c');
$error=$conex->connect_errno;
if($error==null){
	$consulta = $conex->stmt_init();
	$consulta->prepare('SELECT * FROM usuarios WHERE mail=?');
	$consulta->bind_param('s', $mail);
	$consulta->execute();
	$consulta->store_result();
	$row=$consulta->num_rows;
	$resultado='true';
	if($row>0){
		$resultado='false';
	}
	
}
else{
	print"Error al conectar con la base de datos nataliajimenez_c(usuarios)";
}
echo $resultado;
$conex->close();
unset($conex);

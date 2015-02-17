<?php 

$host="localhost":
$usuario="nataliajimenez_c";
$pass="441983";
$db="nataliajimenez_c";
$con = new mysql($host , $usuario , $pass , $db);
$cp=$_REQUEST["cp"];
$consulta = "SELECT m.Municipio , p.Provincia FROM t_municipios m , t_provincias p WHERE m.CodProv=p.CodProv and CodPostal=\"$cp\"";
if($con->connect_errno==null){
	$resultado=$con->query($consulta);
	$con->fetch();
}
$con->close();
?>
<?php 
header('content-type: application/json; charset=utf-8');
// permitir CORS
header("Access-Control-Allow-Origin: *"); 

$info="mysql:host=localhost;dbname=nataliajimenez_c";
$usuario="nataliajimenez_c";
$pass="441983";
//conectamos con la database
try{
	$conexion = new PDO($info , $usuario , $pass);
	$conexion->exec('SET CHARACTER SET utf8');
	
}catch(Exception $e){
	print "Fallo en la conexion ".$e->getMessage();
}
$cp=$_GET["cp"];
$sql=$conexion->prepare("SELECT m.poblacion , p.provincia FROM poblaciones m , provincias p WHERE m.cod_prov=p.cod_prov and m.cod_postal=?");
$sql->bindParam(1 , $cp);
$sql->execute();
$data=array();
if($sql->rowCount()>0){
	while($row=$sql->fetch()){
		$data[]=array(
			'municipio'=>$row['poblacion'],
			'provincia'=>$row['provincia']
			);
	}
}else{
	$data[]=array(
			'municipio'=>"",
			'provincia'=>""
		);
}
echo json_encode($data);

?>
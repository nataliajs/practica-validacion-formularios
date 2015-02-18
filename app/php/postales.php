<?php 

$info="mysql:host=localhost;dbname=nataliajimenez_c":
$usuario="nataliajimenez_c";
$pass="441983";
//conectamos con la database
try{
	$conexion = new PDO($info , $usuario , $pass);
	$conexion->exec('SET CHARACTER SET utf8');
}catch(Exception $e){
	echo "fallo en la conexion ".$e->getMessage();
}

$cp=$_POST["cp"];
$sql = $conexion->prepare("SELECT m.Municipio , p.Provincia FROM t_municipios m , t_provincias p WHERE m.CodProv=p.CodProv and m.CodPostal=?");
$sql->bindParam(1 , $cp);
$sql->execute();
$data=array();
if($sql->rowCount>0){
	while($row=$sql->fetch()){
		$data[]=array(
			'municipio'=$row['Municipio'],
			'provincia'=$row['Provincia']
			);
	}
}else{
	echo "No existe ningun municipio con ese codigo postal";
}
echo json_encode($data);
$con->close();
?>
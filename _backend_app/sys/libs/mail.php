<?php

include_once("config.php");
include_once("PHPMailer/class.phpmailer.php");
include_once("adodb5/adodb.inc.php");

 
function saveData( $nombre, $tel, $email )
{
	
	$db = NewADOConnection('mysql');
	$db->Connect(DB_HOST, DB_USER , DB_PASSWORD, DB_NAME);
	
	
	
	$sql = "INSERT INTO Contacto (nombre, tel,email) values ('" . $nombre . "','" . $tel ."','" . $email ."')";
	
	$db->Execute($sql);


	
}

function isValidEmail($email){
    return preg_match("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^", $email);
}

function sendMail()
{
	
	if( empty( $_POST["nombre"]) || empty( $_POST["email"]) )
	{
		return true;
	}
	
	
	$_POST["nombre"] = htmlentities(strip_tags( $_POST["nombre"] ));
	$_POST["tel"] = htmlentities(strip_tags( $_POST["tel"] ));
	$_POST["email"] = strip_tags( $_POST["email"] );
	
	if( !isValidEmail( $_POST["email"]) )
	{
		return true;
	}
	
	$nombre = $_POST['nombre'];
	$tel = $_POST['tel'];
	$email = $_POST['email'];
	$fecha = date("d/m/Y H:i");
	
	  
	$mail                = new PHPMailer();
	$body                = '<div style="width:500px; margin:auto; min-height:300px; background:#f08b28;">
							<table width="90%" border="0" cellspacing="3" cellpadding="3" style="margin: 20px auto; color:#FFF; font-size:14px; ">
							  <tr>
								<td align="right" style="font-size:12px;">Fecha de invio: ' . $fecha . '</td>
							  </tr>
							  <tr>
								<td><h2>Informaci&oacute;n de Contacto</h2></td>
							  </tr>
							  <tr>
								<td><strong>Nombre:</strong></td>
							  </tr>
							  <tr>
								<td>' . $nombre . '</td>
							  </tr>
							  <tr>
								<td><strong>Tel&eacute;fono:</strong></td>
							  </tr>
							  <tr>
								<td>' . $tel . '</td>
							  </tr>
							  <tr>
								<td><strong>Email:</strong></td>
							  </tr>
							  <tr>
								<td>' . $email . '</td>
							  </tr>
							  <tr>
								<td>&nbsp;</td>
							  </tr>
							  <tr>
								<td align="center" >
								<a href="http://petmovil.com.mx" style="color:#fff;">PetMovil.com.mx</a><br />
								llamarnos  1371-4167
								</td>
							  </tr>
							</table>
							</div>';
							
							
	
	$mail->IsSendmail(); 
	
	$mail->From = "info@petmovil.com.mx";
	
	$mail->FromName = "Pet Movil";
	
	$address = "jonathan@haiku.com.mx";
	$mail->AddAddress($address);
	
	$mail->Subject    = "Bienvenido a Pet Movil";
	
	$mail->AltBody    = ""; // optional, comment out and test
	
	$mail->MsgHTML($body);
	
	
	$mail->Send();
	saveData( $nombre, $tel, $email );

	return true;
	   
}

?>
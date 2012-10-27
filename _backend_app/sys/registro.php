<?php

include_once("libs/config.php");
include_once("libs/PHPMailer/class.phpmailer.php");
include_once("libs/adodb5/adodb.inc.php");
include_once("libs/session.php");

function isValidEmail($email){
    return preg_match("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^", $email);
}

function sendMail($nombre, $email, $pass)
{
	$fecha = date("d/m/Y H:i");
	$mail                = new PHPMailer();
	$body                = '<div style="width:500px; margin:auto; min-height:300px; background:#DEE21B;">
							<table width="90%" border="0" cellspacing="3" cellpadding="3" style="margin: 20px auto; color:#000; font-size:14px; ">
							  <tr>
								<td align="right" style="font-size:12px;">Fecha de invio: ' . $fecha . '</td>
							  </tr>
							  <tr>
								<td><h2>ZOOMate | Datos de registro</h2></td>
							  </tr>
							  <tr>
								<td><strong>Nombre:</strong></td>
							  </tr>
							  <tr>
								<td>' . $nombre . '</td>
							  </tr>
							  <tr>
								<td><h3>Datos de acceso:</h3></td>
							  </tr>
							  <tr>
								<td><strong>Email:</strong></td>
							  </tr>
							  <tr>
								<td>' . $email . '</td>
							  </tr>
							  <tr>
								<td><strong>Contrase&ntilde;a:</strong></td>
							  </tr>
							  <tr>
								<td>' . $pass . '</td>
							  </tr>
							  <tr>
								<td>&nbsp;</td>
							  </tr>
							</table>
							</div>';
							
							
	
	$mail->IsSendmail(); 
	
	$mail->From = "info@iteso.mx";
	
	$mail->FromName = "ZOOMate | ITESO";
	
	//$address = "jonathan@haiku.com.mx";
	$address = $email;
	$mail->AddAddress($address);
	
	$mail->Subject    = "Registro ZOOMate";
	
	$mail->MsgHTML($body);
	
	
	$mail->Send();
}


	
if( $_POST )
{
	
	
	$nombre = trim(strip_tags($_POST["nombre"]));
	$email  = trim(strip_tags($_POST["email"]));
	$pass   = trim(strip_tags($_POST["pass"]));
	$msgError = "";
	$errors = array();
	$error = 0;
	
	if($nombre == "")
	{
		$msgError .= "<p>El campo nombre es requerido.</p>";
		$error = 1;
		$errors["nombre"] = true;
	}
	
	if($email == "")
	{
		$msgError .= "<p>El campo email es requerido.</p>";
		$error = 1;
		$errors["email"] = true;
	}
	else if( !isValidEmail($email)  )
	{
		$msgError .= "<p>El email es invalido.</p>";
		$error = 1;
		$errors["email"] = true;
	}
	
	if($pass == "")
	{
		$msgError .= "<p>El campo contraseña es requerido.</p>";
		$error = 1;
		$errors["pass"] = true;
	}
	
	if( $error == 0)
	{
		
		global $db;
		
		$sql = "INSERT INTO  `zoomate_usuarios` ( `nombre` ,  `email` ,  `pass` )  VALUES ( '".$nombre."',  '".$email."',  '".md5($pass)."' )";
		
		$res = $db->Execute($sql);
		
		if($res)
		{
			$id = $db->Insert_ID();
			
			sendMail($nombre, $email, $pass);
			
			set_session( $id );
			header("Location: index.php");
			
			
			exit();
		}
		else
		{
			$msgError = "<p>Este email ya fue registrado, intenta con otro.</p>";
			$error = 1;
			
		}
		
	}
	
	//
}




?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">


<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="style.css"/>

<script language="javascript" src="js/jquery-1.7.2.min.js"></script>


<script language="javascript" src="bootstrap/js/bootstrap.js"></script>
<script language="javascript" src="js/main.js"></script>

<title> Registro | ZOOMate ITESO</title>
</head>

<body>

<div id="wrapper" class="container">
		<img src="images/zoomate_02.jpg" width="869" height="229" />
		<div class="content-info">
     	
        <form class="form-horizontal" method="post">
         <legend>Registro</legend>
         
     
         <?php if($error==1){ ?>
         <div class="alert alert-block alert-error fade in">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <h4 class="alert-heading">Error en el formulario</h4>
            <p><?php echo $msgError; ?></p>
          </div>
         <?php } ?> 
          
          <div class="control-group <?php if( $errors["nombre"] ){ echo ' error'; }?>">
            <label class="control-label" for="inputNombre">*Nombre completo</label>
            <div class="controls">
              <input type="text" id="inputNombre" placeholder="Nombre" name="nombre" value="<?php echo $_POST["nombre"]; ?>">
            </div>
          </div>
          
          <div class="control-group <?php if( $errors["email"] ){ echo ' error'; }?>">
            <label class="control-label" for="inputEmail">*Email</label>
            <div class="controls">
              <input type="text" id="inputEmail" placeholder="Email" name="email" value="<?php echo $_POST["email"]; ?>">
            </div>
          </div>
          
          <div class="control-group <?php if( $errors["pass"] ){ echo ' error'; }?>">
            <label class="control-label" for="inputPassword">*Contraseña</label>
            <div class="controls">
              <input type="password" id="inputPassword" placeholder="Contraseña" name="pass" value="">
            </div>
          </div>
          
          <div class="control-group">
            <div class="controls">
              <button type="submit" class="btn">Registrar</button>
            </div>
          </div>
          
        </form>
              
              
         
            
     </div>
     <img src="images/zoomate_06.png" width="869" height="150" class="imgfooter" />    
        
        
        
        
</div>
</body>
</html>
<?php

include_once("libs/config.php");
include_once("libs/PHPMailer/class.phpmailer.php");
include_once("libs/adodb5/adodb.inc.php");
include_once("libs/session.php");

global $db;

if($_GET["logout"]==1)
{
	session_destroy();
	header("Location: index.php");
}

// LOGIN
if(isset($_POST["lemail"]) || isset($_POST["lpass"]))
{
	
	$error = 0;
	$msgError = "";
	/*
	llopo02@yahoo.com.mx
	663c93a0afc2736b3d9c0068f17454cf
	*/
	
	$sql = "SELECT *  FROM  `zoomate_usuarios` WHERE  `email` = '".$_POST["lemail"]."' AND  `pass` = '".md5($_POST["lpass"])."'  LIMIT 1";
	//$db->debug = true;
	$rs = $db->Execute($sql);
	
	if(!$rs->fields)
	{
		$error = 1;
		$msgError = "Datos de acceso incorrectos, Usuario no encontrado.";
		
	}
	else
	{
		
		set_session( $rs->fields["id"] );
		header("Location: ?access=".md5(time()));
		
		exit();	
	}
	
}





$id = $session = get_session();
$data_pregunta = getPregunta( $id );

$num_pregunta = $data_pregunta ? $data_pregunta["num_pregunta"] + 1 : 0;


$preguntas = array(
	array(
			"titulo" => "¿Primer pregunta página zoomate 2012 ITESO desarrollo educativo?",
			"video" => "http://www.youtube.com/embed/XH7OShyZ1Ek",
			"nota" => ""
		 ),
	array(
			"titulo" => "¿Segunda pregunta página zoomate 2012 ITESO desarrollo educativo?",
			"video" => "http://www.youtube.com/embed/XH7OShyZ1Ek",
			"nota" => ""
		 )	,
	array(
			"titulo" => "¿Tercera pregunta página zoomate 2012 ITESO desarrollo educativo?",
			"video" => "http://www.youtube.com/embed/XH7OShyZ1Ek",
			"nota" => ""
		 ),
	array(
			"titulo" => "¿Cuarta pregunta página zoomate 2012 ITESO desarrollo educativo?",
			"video" => "http://www.youtube.com/embed/XH7OShyZ1Ek",
			"nota" => ""
		 ),
	array(
			"titulo" => "¿Quinta pregunta página zoomate 2012 ITESO desarrollo educativo?",
			"video" => "http://www.youtube.com/embed/XH7OShyZ1Ek",
			"nota" => ""
		 )	 	 	 	 	 	 	 
		 	  
);


// GUARDAR PREGUNTA
if(isset($_POST["respuesta"]) && $_POST["respuesta"] !="" && $_POST["input-video"] == 1)
{
	$res = savePregunta( $id, $_POST["idPregunta"], $preguntas[$_POST["idPregunta"]]["titulo"], $_POST["respuesta"]);
	
	if($res == true)
	$num_pregunta = $_POST["idPregunta"] + 1;
	
	
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

<title>Ciboost</title>
</head>

<body>

<div id="wrapper" class="container">
<img src="images/zoomate_02.jpg" width="869" height="229" />
	<?php if($session) {?>
		<?php if(count($preguntas) == $num_pregunta ){ 
				session_destroy();
		?>
        	<div class="content-info font27" style="padding:30px; min-height:200px;">
            	<center>Gracias por ZOOMarte</center>
            </div>
        <?php } else { ?>
		<div class="content-info">
        	<form name="form-preguntas" id="form-preguntas" action="" method="post">
			<?php $pregunta = $preguntas[$num_pregunta]; ?>
          
          	  <div class="row-fluid">
              	  <div class="salir clearfix" ><a href="index.php?logout=1" style="float:right;"><i class="icon-lock"></i> Logout</a></div>
                  <span class="span3 font27">Pregunta <?php echo $num_pregunta + 1; ?></span>
                  <span class="span8 font25"><?php echo $pregunta["titulo"]; ?></span>
              </div>
              
             
             <iframe width="100%" height="360" src="http://www.youtube.com/embed/jBixP_xSFWk?rel=0&autoplay=1" frameborder="0" allowfullscreen id="video"></iframe>
              
              <br />
              
              <div id="cont-resp" style="display:none;"><br />
                  <label for="respuesta" class="font25">Comentario</label>
                  <textarea rows="5" name="respuesta" id="respuesta"></textarea>
                  <input type="hidden" name="idPregunta" value="<?php echo $num_pregunta; ?>" />
                  <span class="help-block"><?php echo $pregunta["nota"]; ?></span>
                                    
                  <button type="button" class="btn continuar">Continuar</button>
              </div>
                  
             
        </form>      
    	</div>
        
        
        <img src="images/zoomate_06.png" width="869" height="150" class="imgfooter" />
        
        <div class="cont-progress">
            <div class="progress">
                <div class="bar" style="width:<?php echo (100/count($preguntas)) * ($num_pregunta+1) ; ?>%"></div>
            </div>
        </div>
        
        <?php } ?>
	 
     <?php } else { ?>
     <div class="content-info">
     	<div style="width:280px; margin:auto;">
       	 <form name="form-preguntas" id="form-preguntas" action="" method="post">
        		
                     <legend>Acceso</legend>
                     
                     <?php if($error==1){ ?>
        			 <div class="alert alert-block alert-error fade in">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        <h4 class="alert-heading">Error de acceso</h4>
                        <p><?php echo $msgError; ?></p>
                     </div>
                 	 <?php } ?> 
                      
                     <div class="controls ">
                          <label>Email</label>
                          <input type="email" placeholder="Email" class="input-xlarge" name="lemail">
                          
                          <label>Password</label>
                          <input type="password" placeholder="Password" class="input-xlarge" name="lpass">
                          <br /><br />
                          <button type="button" class="btn btn-small" onclick="javascript:window.location = 'registro.php';">Registro</button> 
                          <button type="submit" class="btn btn-warning btn-small enviar">Ingresar</button>
                    </div>
                  
                  
        </form>      
        </div>
           
     </div>
     <img src="images/zoomate_06.png" width="869" height="150" class="imgfooter" />
     <?php } ?>
    

</div>
</body>
</html>

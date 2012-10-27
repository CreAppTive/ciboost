<?php

include_once("libs/config.php");
include_once("libs/PHPMailer/class.phpmailer.php");
include_once("libs/adodb5/adodb.inc.php");
include_once("libs/session.php");

global $db;
$user = "admin";
$pass = "admin2012";

if($_GET["logout"]==1)
{
	session_destroy();
	header("Location: ?access=null");
}

// LOGIN
if(isset($_POST["luser"]) || isset($_POST["lpass"]))
{
	var_dump($_POST);
	exit();
	$error = 0;
	$msgError = "";
	
	$rs = $db->Execute($sql);
	
	if( $_POST["luser"] != $user || $_POST["lpass"] != $pass )
	{
		$error = 1;
		$msgError = "Datos de acceso incorrectos, Usuario no encontrado.";
		
	}
	else
	{
		
		set_session( "admin","backend" );
		header("Location: ?access=".md5(time()));
		
		exit();	
	}
	
}





$id = $session = get_session("backend");
// REGISTROS
if($id)
{
	$page = (int)$_GET["page"] > 0 ? $_GET["page"] : 0;
	$limite = 10;
	
	$rs = $db->Execute("select * from zoomate_usuarios ORDER BY id DESC LIMIT ".($page*$limite).", $limite");
	$count = $db->Execute("select count(*) as cantidad from zoomate_usuarios ");

	$totalUsuarios = $count->fields["cantidad"];

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

<title>ZOOMate | ITESO</title>
</head>

<body>

<div id="wrapper" class="container">
<img src="images/zoomate_02.jpg" width="869" height="229" />
	
		
     <?php if($session) { ?>
		<div class="content-info">
        <div class="page-header">
        	<div class="salir clearfix" ><a href="index.php?logout=1" style="float:right;"><i class="icon-lock"></i> Logout</a></div>
            <h1>Registros</h1>
            
        </div>
          
        <div><i class="icon-user"></i> Usuarios: <?php echo $totalUsuarios; ?> </div>
        <table class="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Preguntas Contestadas</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              <?php foreach ($rs as $key => $row) {  ?>
              <?php 
			 	 $sub = $db->Execute("select * from zoomate_respuestas WHERE id_usuario = '".$row["id"]."' ORDER BY num_pregunta DESC LIMIT 1");
				 $sub = $sub->fields;
				 
			  ?>
                <tr>
                  <th><?php echo $end = ($key + 1) + ($page*$limite); ?></th>
                  <td><?php  echo $row["nombre"]; ?><br /><?php  echo $row["email"]; ?></td>
                  <td><?php  echo isset($sub["num_pregunta"]) ? ($sub["num_pregunta"]+1) : 0; ?></td>
                  <td><?php  echo $sub["hora"]; ?></td>
                  <th> <a href="store_detalle.php?id=<?php echo $row["id"];?>"><i class="icon-plus-sign"></i> Ver</a></th>
                </tr>
               <?php } ?> 
              </tbody>
            </table>
        	      <br />
            <div>
			   <?php if($page > 0) {?> 
               <a href="?page=<?php echo $page > 0 ? $page -1 : 0; ?>" style="float:left;"><i class="icon-chevron-left"></i> Anteriror</a>
               <?php } ?>
               
               
               <?php if($end < $totalUsuarios) {?> 
               <a href="?page=<?php echo $page + 1; ?>" style="float:right;">Siguiente <i class="icon-chevron-right"></i></a>
               <?php } ?>
               
            </div>
    	</div>
        
        
        <img src="images/zoomate_06.png" width="869" height="150" class="imgfooter" />
        
        
        
        <?php  ?>
	 
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
                          <label>Usuario</label>
                          <input type="text" placeholder="Usuario" class="input-xlarge" name="luser">
                          
                          <label>Password</label>
                          <input type="password" placeholder="Password" class="input-xlarge" name="lpass">
                          <br /><br />
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

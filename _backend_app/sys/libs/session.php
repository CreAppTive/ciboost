<?php 
@session_start();


$db = NewADOConnection('mysql');
$db->Connect(DB_HOST, DB_USER , DB_PASSWORD, DB_NAME);
$db->SetCharSet('utf8');

$GLOBALS["db"] = $db;




function set_session( $id , $name = "session")
{
	$_SESSION[$name] = base64_encode($id);
	
}


function get_session( $name = "session" )
{
	return base64_decode( $_SESSION[$name] );
}


function getPregunta( $id , $num = -1 )
{
	global $db;
	
	if( $num > -1 )
		$num_pregunta = " AND num_pregunta = '".$num."'";
	
	$sql = "SELECT *  FROM  `zoomate_respuestas` WHERE  `id_usuario` = '".$id."' $num_pregunta ORDER BY num_pregunta DESC LIMIT 1";
	$rs = $db->Execute($sql);
	
	
	return $rs->fields;
	
}

function savePregunta( $id, $num_pregunta, $pregunta, $respuesta )
{
	
	$preguntaEncontrada = getPregunta( $id , $num_pregunta );
	
	global $db;
	
	if(!$preguntaEncontrada)
	{
		// Agregar
		$sql = "INSERT INTO  `zoomate_respuestas` ( `id_usuario` ,  `num_pregunta` ,  `pregunta` , `respuesta` )  VALUES ( '".$id."',  '".$num_pregunta."',  '".$pregunta."',  '".strip_tags($respuesta)."' )";
		$res = $db->Execute($sql);
		return $res ? true : false;
		
	}
	else
	{
		// Modificar
		$sql = "UPDATE  `zoomate_respuestas` SET  `respuesta` =  '".$respuesta."', `pregunta` = '".$pregunta."' WHERE `id` = ".$preguntaEncontrada["id"]." LIMIT 1 ";
		$res = $db->Execute($sql);
		return $res ? true : false;
		
		
	}
	

	
}

function login()
{
	
	$user = "admin";
	$pass = "admin2012";
	
	
	// LOGIN
	if(isset($_POST["lemail"]) || isset($_POST["lpass"]))
	{
		
		$error = 0;
		$msgError = "";
		
		if( $_POST["lemail"] != $user || $_POST["lpass"] != $pass )
		{
			$error = 1;
			$msgError = "Datos de acceso incorrectos, Usuario no encontrado.";
			
		}
		else
		{
			
			set_session( "admin","backend" );
			header("Location: index.php");
			
			exit();	
		}
		
	}
	
	return array( $error,  $msgError);
	
}

function loginHTML( $params = array())
{
	
	list($error,$msgError) = $params;
	?>
    
    <form name="form-login" id="form-login" action="" method="post">
        		
                     <legend>Acceso</legend>
                     
                     <?php if($error==1){ ?>
        			 <div class="alert alert-block alert-error fade in">
                        <h4 class="alert-heading">Error de acceso</h4>
                        <p><?php echo $msgError; ?></p>
                     </div>
                 	 <?php } ?> 
                      
                     <div class="controls ">
                          <label>Email</label>
                          <input type="text" placeholder="Email" class="input-xlarge" name="lemail" value="<?php echo $_POST["lemail"] ?>">
                          
                          <label>Password</label>
                          <input type="password" placeholder="Password" class="input-xlarge" name="lpass">
                          <br /><br /> 
                          <button type="submit" class="btn enviar">Ingresar</button>
                    </div>
                  
                  
        </form>
        
   <?php 
	
}

function logout()
{
	if($_GET["logout"]==1)
	{
		session_destroy();
		header("Location: index.php");
	}

}


function getCategories( $ids = "" )
{
	
	global $db;
	$where = "";
	
	if($ids != "")
		$where = " WHERE id in (".$ids.")";
	
	$rs = $db->Execute("select * from categories ".$where." ORDER BY name ASC");
	
	return $rs;
}

?>
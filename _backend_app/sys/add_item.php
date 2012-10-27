<?php

include_once("libs/config.php");
include_once("libs/PHPMailer/class.phpmailer.php");
include_once("libs/adodb5/adodb.inc.php");
include_once("libs/session.php");
//header ('Content-type: text/html; charset=utf-8');
global $db;


$session = get_session("backend");
if(!$session)
{
	header("Location: login.php");
}

if( (int)$_GET["id"] )
{
	global $db;
	$store = $db->Execute("select * from stores WHERE id = '".$_GET["id"]."' LIMIT 1");
	$store  = $store->fields;
}

if($_POST["name"] && (int)$_GET["id"])
{
	global $db;
	
	foreach($_POST as $key => $value )
  		$_POST[$key] =  trim(strip_tags($value));
		
	if((int)$_GET["id_item"])
	{
						  
						  
		// EDITAR	
		 $sql = "UPDATE  `store_items` SET 
		 		  `name` = '".$_POST["name"]."', 
		 		  `image` = '".$_POST["image"]."',
				  `description` = '".$_POST["description"]."',
				  `cost` = '".$_POST["cost"]."'
				   WHERE `id` = '".$_GET["id_item"]."' AND id_store = '".$_GET["id"]."' ";
		
	}	
	else
	{
		// AGREGAR	
		 $sql = "INSERT INTO  `store_items` ( 
		 		  `name`,
				  `image`,
				  `description`,
				  `cost`,
				  `id_store`
				  )  VALUES ( 
						  '".$_POST["name"]."',
						  '".$_POST["image"]."',
						  '".$_POST["description"]."',
						  '".$_POST["cost"]."',
						  '".$_GET["id"]."'
				  )";
	}
		
  
  		//$db->debug = true;
		$res = $db->Execute($sql);
		header("Location: items.php?id=".$_GET["id"]);
  
	
	exit();
}


if((int)$_GET["id_item"])
{
	$rs = $db->Execute("select * from store_items WHERE id = '".(int)$_GET["id_item"]."'");
	$dataDB = $rs->fields;

  $_POST["name"] = $dataDB["name"];
  $_POST["image"] = $dataDB["image"];
  $_POST["description"] = $dataDB["description"];
  $_POST["cost"] = $dataDB["cost"];


		  
	
	$edit = 1;
}


?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ciboost</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    
    
    
    
        <!-- Le styles -->
        <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css">
    	<link rel="stylesheet" type="text/css" href="style.css"/>
		<style>
          body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
          }
		  #map_canvas {
			height: 200px;
		  }
        </style>
        <link href="bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
    
        <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
          <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#"><img src="images/logo.png" width="89" height="29"></a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li><a href="#">Places</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="contact.php">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
		
      
      <?php if($session) { ?>
		<div class="content-info">
        <div class="page-header">
        	<div class="salir clearfix" ><a href="index.php?logout=1" style="float:right;"><i class="icon-lock"></i> Logout</a></div>
            <h1><?php if($edit==1){ ?>Edit<?php  }else{ ?>Add<?php } ?> Item</h1>
            Store: <strong><?php echo $store["name"]; ?></strong>
            
        </div>
          
        <div>
          <form class="form-horizontal" name="form-add" method="post">
        <h4>General</h4>
          <div class="control-group">
            <label class="control-label" for="inputName">Name</label>
            <div class="controls">
              <input name="name" type="text" class="input-xxlarge" id="inputName" placeholder="Name" value="<?php echo $_POST["name"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputDescription">Description</label>
            <div class="controls">
              <textarea name="description" rows="5" class="input-xxlarge" id="inputDescription" placeholder="Description"><?php echo $_POST["description"]; ?></textarea>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputCost">Cost </label>
            <div class="controls">
              <input name="cost" type="text" class="input-xxlarge" id="inputCost" placeholder="9.99" value="<?php echo $_POST["cost"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputImage">Image</label>
            <div class="controls">
              <input name="image" type="text" id="inputImage" placeholder="Dropbox url" class="input-xxlarge" value="<?php echo $_POST["image"]; ?>">
            </div>
          </div>
          <h4>&nbsp;</h4>
          <div class="control-group">
            <div class="controls">
            
              <button type="submit" class="btn btn-primary"><?php if($edit==1){ ?>Edit<?php  }else{ ?>Send<?php } ?></button>
            </div>
          </div>
        </form>


    	</div>
        
        
        
        
        <?php  ?>
	 
     <?php } ?>

    </div> <!-- /container -->



    
    
    
    
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script language="javascript" src="js/jquery-1.7.2.min.js"></script>
    <script language="javascript" src="bootstrap/js/bootstrap.js"></script>
    <script language="javascript" src="js/main.js"></script>
    <script src="bootstrap/js/bootstrap-transition.js"></script>
    <script src="bootstrap/js/bootstrap-alert.js"></script>
    <script src="bootstrap/js/bootstrap-modal.js"></script>
    <script src="bootstrap/js/bootstrap-dropdown.js"></script>
    <script src="bootstrap/js/bootstrap-scrollspy.js"></script>
    <script src="bootstrap/js/bootstrap-tab.js"></script>
    <script src="bootstrap/js/bootstrap-tooltip.js"></script>
    <script src="bootstrap/js/bootstrap-popover.js"></script>
    <script src="bootstrap/js/bootstrap-button.js"></script>
    <script src="bootstrap/js/bootstrap-collapse.js"></script>
    <script src="bootstrap/js/bootstrap-carousel.js"></script>
    <script src="bootstrap/js/bootstrap-typeahead.js"></script>
    
    
    
    </body>
</html>
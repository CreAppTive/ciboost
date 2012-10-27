<?php

include_once("libs/config.php");
include_once("libs/PHPMailer/class.phpmailer.php");
include_once("libs/adodb5/adodb.inc.php");
include_once("libs/session.php");
header ('Content-type: text/html; charset=utf-8');
$session = get_session();
$dataLogin = login();



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
          <a class="brand" href="#"><img src="images/logo.png" width="89" height="29"></a>
          
        </div>
      </div>
    </div>

    <div class="container">
		
      
      <?php loginHTML($dataLogin); ?>
      
      

    </div> <!-- /container -->



    
    
    
    
    
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script language="javascript" src="js/jquery-1.7.2.min.js"></script>
    <script language="javascript" src="bootstrap/js/bootstrap.js"></script>
    <script language="javascript" src="js/main.js"></script>

  </body>
</html>
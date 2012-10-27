<?php

include_once("libs/config.php");
include_once("libs/PHPMailer/class.phpmailer.php");
include_once("libs/adodb5/adodb.inc.php");
include_once("libs/session.php");
logout();

global $db;


$session = get_session("backend");
if(!$session)
{
	header("Location: login.php");
}


	$page = (int)$_GET["page"] > 0 ? $_GET["page"] : 0;
	$limite = 10;
	
	$rs = $db->Execute("select * from stores ORDER BY id DESC LIMIT ".($page*$limite).", $limite");
	$count = $db->Execute("select count(*) as cantidad from stores ");

	$granTotal = $count->fields["cantidad"];




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
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#"><img src="images/logo.png" width="89" height="29"></a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li class="active"><a href="#">Places</a></li>
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
            <h1>Places</h1>
            
        </div>
        <div><a href="store.php"><i class="icon-plus"></i> add place</a></div>  
        <div>Total: <?php echo $granTotal; ?> </div>
        <table class="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Contact</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              <?php if($rs) foreach ($rs as $key => $row) {  ?>
              <?php 
			 	// $sub = $db->Execute("select * from items WHERE id_store = '".$row["id"]."' ORDER BY num_pregunta DESC LIMIT 1");
				// $sub = $sub->fields;
				 
			  ?>
                <tr>
                  <td><?php echo $end = ($key + 1) + ($page*$limite); ?></td>
                  <td><?php  echo $row["name"]; ?><br /><?php  echo $row["email"]; ?></td>
                  <td><?php  echo $row["description"]; ?></td>
                  <td><?php  echo $row["contact_address"]; ?><br><?php  echo $row["phone"]; ?></td>
                  <td> <a href="store.php?id=<?php echo $row["id"];?>"><i class="icon-pencil"></i> Edit</a>
                  		<a href="items.php?id=<?php echo $row["id"];?>"><i class="icon-th"></i> Items</a>
                        <a href="ventas.php"><i class="icon-th"></i> Sales</a>
				</td>
                </tr>
               <?php } ?> 
              </tbody>
            </table>
        	      <br />
            <div>
			   <?php if($page > 0) {?> 
               <a href="?page=<?php echo $page > 0 ? $page -1 : 0; ?>" style="float:left;"><i class="icon-chevron-left"></i> Back</a>
               <?php } ?>
               
               
               <?php if($end < $totalUsuarios) {?> 
               <a href="?page=<?php echo $page + 1; ?>" style="float:right;">Next <i class="icon-chevron-right"></i></a>
               <?php } ?>
               
            </div>
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
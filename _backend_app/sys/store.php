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


if($_POST["name"])
{
	global $db;
	
	 $categories = implode(",", $_POST["categories"]);
	
	foreach($_POST as $key => $value )
  		$_POST[$key] =  trim(strip_tags($value));
		
	if((int)$_GET["id"])
	{
						 
						  
		// EDITAR	
		 $sql = "UPDATE  `stores` SET 
		 		  `name` = '".$_POST["name"]."', 
		 		  `image` = '".$_POST["image"]."',
				  `description` = '".$_POST["description"]."',
				  `url` = '".$_POST["url"]."',
				  `contact_address` = '".$_POST["address"]."',
				  `phone` = '".$_POST["phone"]."',
				  `twitter` = '".$_POST["twitter"]."',
				  `facebook` = '".$_POST["facebook"]."',
				  `location_address` = '".$_POST["address2"]."',
				  `cross_street` = '".$_POST["crossstreet"]."',
				  `postal_code` = '".$_POST["postalcode"]."',
				  `city` = '".$_POST["city"]."',
				  `state` = '".$_POST["state"]."',
				  `country` = '".$_POST["country"]."',
				  `lat` =  '".$_POST["lat"]."',
				  `lng` = '".$_POST["lng"]."',
				  `categories` = '".$categories."',
				  `id_cuenta` = '".$_POST["id_cuenta"]."',
				  `token` = '".$_POST["token"]."'
				   WHERE CONCAT( `id` ) = '".$_GET["id"]."'";
		
	}	
	else
	{
		// AGREGAR	
		 $sql = "INSERT INTO  `stores` ( `name`,
				  `image`,
				  `description`,
				  `url`,
				  `contact_address`,
				  `phone` ,
				  `twitter`,
				  `facebook`,
				  `location_address`,
				  `cross_street`,
				  `postal_code`,
				  `city`,
				  `state`,
				  `country`,
				  `lat`,
				  `lng`,
				  `categories`,
				  `id_cuenta`,
				  `token`   )  VALUES ( 
						  '".$_POST["name"]."',
						  '".$_POST["image"]."',
						  '".$_POST["description"]."',
						  '".$_POST["url"]."',
						  '".$_POST["address"]."',
						  '".$_POST["phone"]."' ,
						  '".$_POST["twitter"]."',
						  '".$_POST["facebook"]."',
						  '".$_POST["address2"]."',
						  '".$_POST["crossstreet"]."',
						  '".$_POST["postalcode"]."',
						  '".$_POST["city"]."',
						  '".$_POST["state"]."',
						  '".$_POST["country"]."',
						  '".$_POST["lat"]."',
						  '".$_POST["lng"]."',
						  '".$categories."',
						  '".$_POST["id_cuenta"]."',
						  '".$_POST["token"]."'
				  )";
	}
		
  
  
		$res = $db->Execute($sql);
		header("Location: index.php");
  
	
	exit();
}

$categoriesStore = array();
if((int)$_GET["id"])
{
	$rs = $db->Execute("select * from stores WHERE id = '".(int)$_GET["id"]."'");
	$dataDB = $rs->fields;

  $_POST["name"] = $dataDB["name"];
  $_POST["image"] = $dataDB["image"];
  $_POST["description"] = $dataDB["description"];
  $_POST["url"] = $dataDB["url"];
  $_POST["address"] = $dataDB["contact_address"];
  $_POST["phone"] = $dataDB["phone"];
  $_POST["twitter"] = $dataDB["twitter"];
  $_POST["facebook"] = $dataDB["facebook"];
  $_POST["address2"] = $dataDB["location_address"];
  $_POST["crossstreet"] = $dataDB["cross_street"];
  $_POST["postalcode"] = $dataDB["postal_code"];
  $_POST["city"] = $dataDB["city"];
  $_POST["state"] = $dataDB["state"];
  $_POST["country"] = $dataDB["country"];
  $_POST["lat"] = $dataDB["lat"];
  $_POST["lng"] = $dataDB["lng"];
  $categoriesStore = explode(",",$dataDB["categories"]);
  $_POST["id_cuenta"] = $dataDB["id_cuenta"];
  $_POST["token"] = $dataDB["token"];
		  
	
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
            <h1>Add Store</h1>
            
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
            <label class="control-label" for="inputURL">Web page</label>
            <div class="controls">
              <input name="url" type="text" class="input-xxlarge" id="inputURL" placeholder="http://webpage.com" value="<?php echo $_POST["url"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputImage">Image</label>
            <div class="controls">
              <input name="image" type="text" id="inputImage" placeholder="Dropbox url" class="input-xxlarge" value="<?php echo $_POST["image"]; ?>">
            </div>
          </div>
          <h4>Contact</h4>
          <div class="control-group">
            <label class="control-label" for="inputAddress">Address</label>
            <div class="controls">
              <input name="address" type="text" class="input-xxlarge" id="inputAddress" placeholder="Address" value="<?php echo $_POST["address"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputPhone">Phone</label>
            <div class="controls">
              <input name="phone" type="text" class="input-xxlarge" id="inputPhone" placeholder="Phone" value="<?php echo $_POST["phone"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputTwitter">Twitter</label>
            <div class="controls">
              <input name="twitter" type="text" class="input-xxlarge" id="inputTwitter" placeholder="Twitter url" value="<?php echo $_POST["twitter"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputFacebook">Facebook</label>
            <div class="controls">
              <input name="facebook" type="text" class="input-xxlarge" id="inputFacebook" placeholder="Facebook url" value="<?php echo $_POST["facebook"]; ?>">
            </div>
          </div>
          
          <h4>Location</h4>
          <div class="control-group">
            <label class="control-label" for="inputAddress2">Address</label>
            <div class="controls">
              <textarea name="address2" rows="5" class="input-xxlarge" id="inputAddress2" placeholder="Address"><?php echo $_POST["address2"]; ?></textarea>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputCrossstreet">Cross street</label>
            <div class="controls">
              <input name="crossstreet" type="text" class="input-xxlarge" id="inputCrossstreet" placeholder="Cross street" value="<?php echo $_POST["crossstreet"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputPostalcode">Postal code</label>
            <div class="controls">
              <input name="postalcode" type="text" class="input-xxlarge" id="inputPostalcode" placeholder="Postal code" value="<?php echo $_POST["postalcode"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputCity">City</label>
            <div class="controls">
              <input name="city" type="text" class="input-xxlarge" id="inputCity" placeholder="City" value="<?php echo $_POST["city"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputState">State</label>
            <div class="controls">
              <input name="state" type="text" class="input-xxlarge" id="inputState" placeholder="State" value="<?php echo $_POST["state"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="inputCountry">Country</label>
            <div class="controls">
              <input name="country" type="text" class="input-xxlarge" id="inputCountry" placeholder="Country" value="<?php echo $_POST["country"]; ?>">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">Map</label>
            <div class="controls">
              <div id="map_canvas" class="input-xxlarge"></div>
              <a onClick="javascript:barcelona();"><i class="icon-map-marker"></i> Centro Tecnológico</a>
            </div>
            <input type="hidden" name="lat" id="lat"  value="<?php echo $_POST["lat"]; ?>">
            <input type="hidden" name="lng" id="lng"  value="<?php echo $_POST["lng"]; ?>">
            
          </div>
          
          <h4>La Caixa</h4>
          <div class="control-group">
            <label class="control-label" for="inputIDCuenta">ID Cuenta</label>
            <div class="controls">
              <input type="text" class="input-xxlarge" name="id_cuenta" id="inputIDCuenta"  value="<?php echo $_POST["id_cuenta"]; ?>" placeholder="ID Cuenta">
            </div>
          </div>
          
          <div class="control-group">
            <label class="control-label" for="inputToken">Token</label>
            <div class="controls">
              <input name="token" type="text" class="input-xxlarge" id="inputToken" placeholder="Token" value="<?php echo $_POST["token"]; ?>">
            </div>
          </div>
          
          
           <h4>Categories</h4>
          <div class="control-group">
            
            <div class="controls">
            <?php $categories = getCategories(); ?>
            <?php foreach ($categories as $key => $cat) { ?>
             <label class="checkbox">
                <input name="categories[<?php echo $key; ?>]" type="checkbox" id="categories[<?php echo $key; ?>]" value="<?php echo $cat["id"]; ?>" <?php if(in_array($cat["id"],$categoriesStore)){?>checked="checked"<?php } ?> > <?php echo $cat["name"]; ?>
              </label>
             <?php } ?>  
            </div>
          </div>
          
          
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
    
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script>
	var map;
	var added = false;
	var marker;
      function initialize() {
        map = new google.maps.Map(document.getElementById('map_canvas'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom: 15
        });
		
		google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(event.latLng);
	  	});
		
		<?php if(!$edit){ ?> 
			// Try HTML5 geolocation
			if(navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude,
												 position.coords.longitude);
	
				var infowindow = new google.maps.InfoWindow({
				  map: map,
				  position: pos
				});
	
				map.setCenter(pos);
			  }, function() {
				handleNoGeolocation(true);
			  });
			} else {
			  // Browser doesn't support Geolocation
			  handleNoGeolocation(false);
			}
		<?php } ?>
        
		<?php if($edit == 1 && $_POST["lat"] !="" && $_POST["lng"] !="" ){ ?>
	 		placeMarker(new google.maps.LatLng(<?php echo $_POST["lat"]; ?>, <?php echo $_POST["lng"]; ?>));
	 	<?php } ?>
	 
      }
	  
	  function handleNoGeolocation(errorFlag) {

        var options = {
          map: map,
          position: new google.maps.LatLng(60, 105)
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
      }
	  
	  function placeMarker(location) {
		  if(added== true) return;
		  
		  added = true;
		  marker = new google.maps.Marker({
			  position: location,
			  map: map,
			  draggable: true
		  });
		  
		  
		  $("#lat").val(location.Ya);
		  $("#lng").val( location.Xa ? location.Xa : location.Za);
		  
		  google.maps.event.addListener(marker, 'mouseup', function(event) {
		
			
			$("#lat").val(event.latLng.Ya);
		  	$("#lng").val(event.latLng.Xa ? event.latLng.Xa : event.latLng.Za);
	  	  });
		
		  map.setCenter(location);
	  }
	  
	  function barcelona(){
		  map.setCenter(new google.maps.LatLng(41.402437,2.194862));
	 }
	 
	 
	  

      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
    
    </body>
</html>
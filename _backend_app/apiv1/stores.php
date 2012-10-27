<?php


include_once("../sys/libs/config.php");
include_once("../sys/libs/adodb5/adodb.inc.php");
include_once("../sys/libs/session.php");


$db = NewADOConnection('mysql');
$db->Connect(DB_HOST, DB_USER , DB_PASSWORD, DB_NAME);
$db->SetCharSet('utf8');

$rs = $db->Execute("select * from stores ORDER BY id DESC ");


$imagePath = "http://".$_SERVER['HTTP_HOST'];
$stores = array();
$data = array();

foreach ($rs as $key => $row) {
	$data = $row;
	
	$stores[$key]["id"] = $data["id"];
	$stores[$key]["name"] = $data["name"];
	$stores[$key]["image"] = $data["image"];
	$stores[$key]["description"] = $data["description"];
	$stores[$key]["url"] = $data["url"];



		$cats = getCategories($data["categories"]);
		
		$stores[$key]["categories"] = array();
		foreach ($cats as $cnum => $cat) {
			
			$stores[$key]["categories"][] = array(
					"id"=> $cat["id"],
					"name"=> $cat["name"],
					"icon"=> $cat["icon"]
				);
							
		}
		
		$stores[$key]["contact"] = array(
							"address"=>$data["contact_address"],
							"phone"=>$data["phone"],
							"twitter"=>$data["twitter"],
							"facebook"=>$data["facebook"]
						);
						
		$stores[$key]["location"] = array(
							"address" =>  $data["location_address"],
							"crossStreet" =>  $data["cross_street"],
							"lat" =>  $data["lat"],
							"lng" =>  $data["lng"],
							"distance" =>  $data["facebook"],
							"postalCode" =>  $data["postal_code"],
							"city" =>  $data["city"],
							"state" =>  $data["state"],
							"country" =>  $data["country"],
							"cc" =>  ""							
						);				
		
		
		$items = $db->Execute("select * from store_items WHERE id_store = '".$data["id"]."' ORDER BY id DESC ");
		
		foreach ($items as $inum => $item) {
			
			$stores[$key]["items"][] = array(
					"id"=> $item["id"],
					"name"=> $item["name"],
					"cost"=> $item["cost"],
					"image"=> $item["image"],
					"description"=> $item["description"]
				);
							
		}
		
							
		
	
}

echo json_encode($stores);
exit();

$stores[] = array(
			"id"=>"023942093842",
			"name"=>"Comendor",
			"image"=>$imagePath . "/files/images/big-maki-sushi.jpeg",
			"description"=>"Vivamus non tellus augue, non consectetur nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue magna in metus facilisis vel blandit felis sollicitudin. ",
			
			"categories"=>array(
							array(
								"id"=>"123456789",
								"name"=>"cat name",
								"icon"=>"url"
							)
			
						),
			
			"contact" => array(
							"address"=>"Curabitur congue, tellus eget iaculis lacinia",
							"phone"=>"93 241 18 00",
							"twitter"=>"",
							"facebook"=>""
						),
			
			"location"=> array(
							"address" =>  "96 Lafayette St.",
							"crossStreet" =>  "btwn Walker & White St.",
							"lat" =>  "40.71749323698053",
							"lng" =>  "-74.00106579065323",
							"distance" =>  "1949",
							"postalCode" =>  "10013",
							"city" =>  "New York",
							"state" =>  "NY",
							"country" =>  "United States",
							"cc" =>  "US"							
						),

			"url"=>"",
			"items"=>array(
							array(
								"name"=>"Mauris 1",
								"cost"=>"9.99",
								"image"=>$imagePath . "/files/images/big-maki-sushi.jpeg",
								"id"=>"0001"
							),
							array(
								"name"=>"Mauris 2",
								"cost"=>"9.99",
								"image"=>$imagePath . "/files/images/big-maki-sushi.jpeg",
								"id"=>"0002"
							),
							array(
								"name"=>"Mauris 3",
								"cost"=>"9.99",
								"image"=>$imagePath . "/files/images/big-maki-sushi.jpeg",
								"id"=>"0003"
							)
			
						)
			);
	


?>
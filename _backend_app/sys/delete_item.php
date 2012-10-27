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
	header("Location: index.php");
}


if((int)$_GET["id_item"] && (int)$_GET["id"])
{
	$rs = $db->Execute("DELETE FROM `store_items` WHERE `id` = '".(int)$_GET["id_item"]."' AND id_store = '".(int)$_GET["id"]."'");
 
}


header("Location: items.php?id=".$_GET["id"]);

?>
<?php
include 'general.php';

$api_response = new stdClass();
if(isset($_SESSION['valid_login'])) {
  $api_response->logged_in = $_SESSION['valid_login'];
  if($_SESSION['valid_login']) {
    $api_response->username = $_SESSION['username'];
  }
} else {
  $api_response->logged_in = false;
}

exit(json_encode($api_response));

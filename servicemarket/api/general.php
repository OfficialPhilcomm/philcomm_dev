<?php
session_start();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());
$conn->query("update Counter set Value = Value + 1 where KeyName = 'RequestCount'", MYSQLI_ASYNC);
$conn->close();

function db_host() { return "db5000463258.hosting-data.io"; }
function db_user() { return "dbu43335"; }
function db_pass() { return "2fC&uUc5su!NVFsG"; }
function db_name() { return "dbs443745"; }

function requireLogin() {
  $headers = apache_request_headers();

  f(!array_key_exists("API-Token", $headers)) {
    throwError("API-Token header not set; please request active api key");
  }

  if(!array_key_exists("Auth-Token", $headers)) {
    throwError("Auth-Token header not set; please use active user token");
  }

  $api_token = $headers['API-Token'];
  $auth_token = $headers['Auth-Token'];
  echo "API-Token: ".$api_token;
  echo "Auth-Token: ".$auth_token;
}

function validateBody($arguments) {
  $body = json_decode(file_get_contents('php://input'));
  if(json_last_error() !== JSON_ERROR_NONE) {
    throwError("body not json");
  }
  $keys = array_keys($arguments);
  foreach ($arguments as $key => $value) {
    if(!property_exists($body, $key)) throwError("argument missing: " . $key);
    $arg_type = gettype($body->$key);
    if($arg_type !== $value) throwError("argument " . $key . " must be of type " . $value . " but is " . $arg_type);
  }

  return $body;
}

function getUserID() {
  return $_SESSION['user_id'];
}

function throwError($error) {
  $api_response = new stdClass();
  $api_response->errors = array();
  $api_response->errors[] = $error;
  exit(json_encode($api_response));
}

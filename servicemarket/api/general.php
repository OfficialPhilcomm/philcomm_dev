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

  foreach ($headers as $header => $value) {
    echo "$header: $value\n";
  }

  if(!array_key_exists("Api-Token", $headers)) {
    throwError("Api-Token header not set; please request active api key");
  }

  if(!array_key_exists("Auth-Token", $headers)) {
    throwError("Auth-Token header not set; please use active user token");
  }

  $api_token = $headers['Api-Token'];
  $auth_token = $headers['Auth-Token'];
  echo "Api-Token: ".$api_token;
  echo "Auth-Token: ".$auth_token;

  $conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

  if ($conn->connect_error) {
    throwError("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("select at.ID from AccessToken at
  where at.Token = ?");
  $stmt->bind_param("s", $auth_token);
  $stmt->execute();
  $result = $stmt->get_result();
  if($result->num_rows === 0) throwError("auth token not found");
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

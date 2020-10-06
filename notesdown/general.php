<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Api-Token, Auth-Token");

function db_host() { return "db5001008099.hosting-data.io"; }
function db_user() { return "dbu632988"; }
function db_pass() { return "sV#30J#pVKNfXSZS"; }
function db_name() { return "dbs872879"; }

function getUserID() { return $GLOBALS["userID"]; }

function requireLogin() {
  $headers = apache_request_headers();

  if(!array_key_exists("Api-Token", $headers)) {
    throwError("Api-Token header not set; please request active api key");
  }

  if(!array_key_exists("Auth-Token", $headers)) {
    throwError("Auth-Token header not set; please use active user token");
  }

  $api_token = $headers['Api-Token'];
  $auth_token = $headers['Auth-Token'];

  $conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

  if ($conn->connect_error) {
    throwError("Connection failed: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("select at.ID, u.ID as UserID from AccessToken at
  join User u on at.Token = ?
  and at.UserID = u.ID limit 1");
  $stmt->bind_param("s", $auth_token);
  $stmt->execute();
  $result = $stmt->get_result();
  if($result->num_rows === 0) throwError("auth token not found");
  while($row = $result->fetch_assoc()) {
    $GLOBALS['userID'] = $row["UserID"];
  }
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

function throwError($error) {
  $api_response = new stdClass();
  $api_response->error = $error;
  exit(json_encode($api_response));
}

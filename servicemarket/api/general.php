<?php

session_start();

function db_host() { return "db5000463258.hosting-data.io"; }
function db_user() { return "dbu43335"; }
function db_pass() { return "2fC&uUc5su!NVFsG"; }
function db_name() { return "dbs443745"; }

function requireLogin() {
  if(!$_SESSION['valid_login']) {
    $api_response = new stdClass();
    $api_response->errors = array();
    $api_response->errors[] = "not logged in";
    exit(json_encode($api_response));
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

function getUserID() {
  return $_SESSION['user_id'];
}

function throwError($error) {
  $api_response = new stdClass();
  $api_response->errors = array();
  $api_response->errors[] = $error;
  exit(json_encode($api_response));
}

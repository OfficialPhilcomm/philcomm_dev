<?php
session_start();

$db_host = "db5000463258.hosting-data.io";
$db_user = "dbu43335";
$db_pass = "2fC&uUc5su!NVFsG";
$db_name = "dbs443745";

function db_host() { return $db_host; }
function db_user() { return $db_user; }
function db_pass() { return $db_pass; }
function db_name() { return $db_name; }

function requireLogin() {
  if(!$_SESSION['valid_login']) {
    exit("not logged in");
  }
}

<?php
session_start();

$db_host = "localhost";
$db_user = "servicemarket";
$db_pass = "servicemarket";
$db_name = "ServiceMarket";

function db_host() { return $db_host; }
function db_user() { return $db_user; }
function db_pass() { return $db_pass; }
function db_name() { return $db_name; }

function requireLogin() {
  if(!$_SESSION['valid_login']) {
    exit("not logged in");
  }
}

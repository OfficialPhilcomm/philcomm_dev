<?php
session_start();

function db_host() { return "db5000463258.hosting-data.io"; }
function db_user() { return "dbu43335"; }
function db_pass() { return "2fC&uUc5su!NVFsG"; }
function db_name() { return "dbs443745"; }

function requireLogin() {
  if(!$_SESSION['valid_login']) {
    exit("not logged in");
  }
}

function getUserID() {
  return $_SESSION['user_id'];
}

<?php
include 'general.php';

requireLogin();

$arguments['pokemon_name'] = 'string';
$arguments['gender'] = 'string';
$arguments['move1'] = 'string';
$arguments['move2'] = 'string';
$arguments['move3'] = 'string';
$arguments['move4'] = 'string';
$arguments['ability'] = 'string';
$arguments['iv_hp'] = 'integer';
$arguments['iv_atk'] = 'integer';
$arguments['iv_def'] = 'integer';
$arguments['iv_spatk'] = 'integer';
$arguments['iv_spdef'] = 'integer';
$arguments['iv_spe'] = 'integer';
$arguments['ev_hp'] = 'integer';
$arguments['ev_atk'] = 'integer';
$arguments['ev_def'] = 'integer';
$arguments['ev_spatk'] = 'integer';
$arguments['ev_spdef'] = 'integer';
$arguments['ev_spe'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("insert into OrderData (PokemonName, Gender, Move1, Move2, Move3, Move4, Ability)
values (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $body->pokemon_name, $body->gender, $body->move1, $body->move2, $body->move3, $body->move4, $body->ability);
$stmt->execute();

$userID = getUserID();
$orderDataID = $conn->insert_id;

$stmt = $conn->prepare("insert into UserOrder (UserID,OrderDataID) values (?, ?)");
$stmt->bind_param("ii", $userID, $orderDataID);
$stmt->execute();

$stmt->close();

$conn->close();

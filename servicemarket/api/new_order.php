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

/*IVHP int not null default -1,
IVATK int not null default -1,
IVDEF int not null default -1,
IVSPATK int not null default -1,
IVSPDEF int not null default -1,
IVSPE int not null default -1,
EVHP int not null default -1,
EVATK int not null default -1,
EVDEF int not null default -1,
EVSPATK int not null default -1,
EVSPDEF int not null default -1,
EVSPE int not null default -1*/

$ivs = array();
$ivs[] = "iv_hp";
$ivs[] = "iv_atk";
$ivs[] = "iv_def";
$ivs[] = "iv_spatk";
$ivs[] = "iv_spdef";
$ivs[] = "iv_spe";
$evs = array();
$evs[] = "ev_hp";
$evs[] = "ev_atk";
$evs[] = "ev_def";
$evs[] = "ev_spatk";
$evs[] = "ev_spdef";
$evs[] = "ev_spe";

foreach($ivs as $value) {
  if($body->$value < -1 || $body->$value > 31) throwError("$value must be between -1 and 31");
}
foreach($evs as $value) {
  if($body->$value < 0 || $body->$value > 252) throwError("$value must be between -1 and 31");
}

$stmt = $conn->prepare("insert into OrderData (PokemonName, Gender, Move1, Move2, Move3, Move4, Ability, )
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

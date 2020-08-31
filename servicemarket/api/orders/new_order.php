<?php
include '../general.php';

requireLogin();

$arguments['pokemon_name'] = 'string';
$arguments['gender'] = 'string';
$arguments['move1'] = 'string';
$arguments['move2'] = 'string';
$arguments['move3'] = 'string';
$arguments['move4'] = 'string';
$arguments['level'] = 'integer';
$arguments['ability'] = 'string';
$arguments['item'] = 'string';
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

if($body->level < 0 || $body->level > 100) throwError("level must be between 0 and 100");
foreach($ivs as $value) {
  if($body->$value < -1 || $body->$value > 31) throwError("$value must be between -1 and 31");
}
foreach($evs as $value) {
  if($body->$value < 0 || $body->$value > 252) throwError("$value must be between -1 and 252");
}

$total_evs = $body->ev_hp + $body->ev_atk + $body->ev_def + $body->ev_spatk + $body->ev_spdef + $body->ev_spe;
if($total_evs > 510) throwError("total evs cant be bigger than 510");

$stmt = $conn->prepare("insert into OrderData (PokemonName, Gender, Level, Move1, Move2, Move3, Move4, Ability, Item,
IVHP, IVATK, IVDEF, IVSPATK, IVSPDEF, IVSPE, EVHP, EVATK, EVDEF, EVSPATK, EVSPDEF, EVSPE)
values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
echo $stmt->error;
$stmt->bind_param("ssisssssiiiiiiiiiiii", $body->pokemon_name, $body->gender, $body->level, $body->move1, $body->move2, $body->move3, $body->move4, $body->ability, $body->item,
$body->iv_hp, $body->iv_atk, $body->iv_def, $body->iv_spatk, $body->iv_spdef, $body->iv_spe,
$body->ev_hp, $body->ev_atk, $body->ev_def, $body->ev_spatk, $body->ev_spdef, $body->ev_spe);
$stmt->execute();

$userID = getUserID();
$orderDataID = $conn->insert_id;

$stmt = $conn->prepare("insert into UserOrder (UserID,OrderDataID) values (?, ?)");
$stmt->bind_param("ii", $userID, $orderDataID);
$stmt->execute();

$stmt->close();

$conn->close();

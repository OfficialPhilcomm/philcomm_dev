<?php
$conn = new mysqli("db5000463258.hosting-data.io", "dbu43335", "2fC&uUc5su!NVFsG", "dbs443745");
$conn->query("update Counter set Value = Value + 1 where KeyName = 'VisitCount'", MYSQLI_ASYNC);
$conn->close();
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>ServiceMarket&copy; 2020</title>

    <link rel="stylesheet" href="css/style.css.php">
    <link rel="stylesheet" href="css/progressbar.css">

    <script src="js/PokemonAPI.js" charset="utf-8"></script>
    <script src="js/BackendAPI.js" charset="utf-8"></script>
    <script src="js/LiveData.js" charset="utf-8"></script>
    <script src="js/StringUtils.js" charset="utf-8"></script>
    <script src="js/UIBuilder.js" charset="utf-8"></script>
    <script src="js/ProgressBar.js" charset="utf-8"></script>
    <script src="js/Order.js" charset="utf-8"></script>

    <script defer src="js/main.js" charset="utf-8"></script>
  </head>
  <body>
    <?php include("nav.html"); ?>

    <main>
      <div id="main-container">
        <div id="all-orders" class="all_requests"></div>
        <div id="user_info"></div>
        <div id="my-orders" class="own_requests"></div>
        <div id="more_information" class="more_information"></div>
      </div>
      <div id="popup-container"></div>
    </main>
  </body>
</html>

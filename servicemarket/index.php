<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>

    <link rel="stylesheet" href="css/master.css">
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
        <div id="all-orders" class="all_requests">all_requests</div>
        <div id="user_info"></div>
        <div id="my-orders" class="own_requests">own_requests</div>
        <div id="more_information" class="more_information">more_information</div>
      </div>
      <div id="popup-container"></div>
    </main>
  </body>
</html>

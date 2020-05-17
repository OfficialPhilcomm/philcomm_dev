<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>

    <link rel="stylesheet" href="css/master.css">
    <link rel="stylesheet" href="css/progressbar.css">

    <script src="js/PokemonAPI.js" charset="utf-8"></script>
    <script src="js/BackendAPI.js" charset="utf-8"></script>
    <script src="js/Order.js" charset="utf-8"></script>
    <script defer src="js/NewRequest.js" charset="utf-8"></script>
    <script src="js/StringUtils.js" charset="utf-8"></script>
  </head>
  <body>
    <?php include("nav.html"); ?>

    <main>
      <div class="">
        <select id="pokemon-select" name=""></select>
        <select id="pokemon-gender" name"">
          <option value="none">Don't care</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <div class="">
          Move1
          <select id="move-select1" name=""></select>
          Move2
          <select id="move-select2" name=""></select>
          Move3
          <select id="move-select3" name=""></select>
          Move4
          <select id="move-select4" name=""></select>

          Ability
          <select id="ability-select" name=""></select>
        </div>
        <button id="submit-button">Submit</button>
      </div>
    </main>
  </body>
</html>

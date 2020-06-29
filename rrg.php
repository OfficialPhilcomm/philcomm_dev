<?php include 'helper.php' ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php print_meta_tags(
      "homepage, development, dungeons, dragon, youtube",
      "RRG",
      "The RRG is created for Pen & Blade YouTube channel to quickly generate random tiny D&D settings",
      "https://philcomm.dev/rrg")
    ?>

    <link href="https://fonts.googleapis.com/css?family=Roboto:100,700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/rrg.css">

    <script defer src="assets/js/RandomRegionGenerator.js"></script>
  </head>
  <body>
    <main>
      <div id="buttons"></div>
      <div class="input-wrapper">
        <textarea placeholder="Start by typing text and add generated objects by pressing one of the above buttons" id="text"></textarea>
        <button id="generate_button">Generate text</button>
      </div>
      <div id="generated"></div>
    </main>

    <?php include 'assets/components/footer.html' ?>
  </body>
</html>

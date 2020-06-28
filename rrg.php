<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>RRG | @dev_philcomm</title>
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/rrg.css">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name=" theme-color" content="#10141A">

    <meta name="description" content="The RRG is created for Pen & Blade YouTube channel to quickly generate random tiny D&D settings" />
    <meta name="keywords" content="homepage, development, dungeons, dragon, youtube" />
    <meta property="og:title" content="RRG | @dev_philcomm" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://philcomm.dev/rrg" />
    <meta property="og:site_name" content="@dev_philcomm" />
    <meta property=“og:description“ content="The RRG is created for Pen & Blade YouTube channel to quickly generate random tiny D&D settings" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="RRG | @dev_philcomm" />
    <meta name="twitter:description" content="The RRG is created for Pen & Blade YouTube channel to quickly generate random tiny D&D settings" />
    <meta name="twitter:site" content="@dev_philcomm" />

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

<?php include 'helper.php' ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <?php print_meta_tags(
    "homepage, development, 404",
    "Not found",
    "404 not found",
    "https://philcomm.dev/404")
  ?>

  <link href="https://fonts.googleapis.com/css?family=Roboto:100,700&display=swap" rel="stylesheet">

  <meta charset="utf-8">
  <meta name="description" content="404 not found">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" type="text/css" href="assets/css/footer.css">
  <link rel="stylesheet" type="text/css" href="assets/css/404.css">
</head>
<body>
  <main>
    The given URL was not found
  </main>

  <?php include 'assets/components/footer.html' ?>
</body>
</html>

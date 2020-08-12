<?php include 'helper.php' ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php print_meta_tags(
      "homepage, development, safety, passwords",
      "save password initiative",
      "An initiative motivating people to use save passwords",
      "https://philcomm.dev/flappybird")
    ?>

    <link rel="stylesheet" href="assets/css/password_initiative.css">
    <link rel="stylesheet" href="assets/css/footer.css">

    <script src="assets/js/PasswordScheme.js" charset="utf-8"></script>
  </head>
  <body>
    <main>
      <div class="text-section">
        <h1>save password initiative</h1>
        <p>
          Everybody knows that internet privacy is important. Today, we are doing
          so much online, that perhaps losing the key to your home is not as harmful
          as getting your passwords leaked.
        </p>
        <p>
          That's why it is very important to have safe passwords. But just your name
          with a number and one capital letter doesn't do the trick.
        </p>
        <p>
          A lot of people don't use save passwords because they fear forgetting them, me included.
          So I came up with a system that works good for me, and it might help other people too.
          That's why I am sharing it here.
        </p>
        <h1>password scheme</h1>
        <ol>
          <li>It is randomized, safer than password related to your life</li>
          <li>It is an easy to remember scheme</li>
          <li>Since its easy to remember, you can change it on a monthly base</li>
        </ol>
        <p>
          The scheme works as following:<br>
          A capital letter, followed b three upper case letters, and a 4 digit number.<br>
          For example: <span id="randomPW" />
          <script>
            document.getElementById("randomPW").innerHTML = passwordScheme.generatePassword();
          </script>
        </p>
        <p>
          If you are using a new password like this every month, you are already taking a huge
          step in the right direction.
        </p>
      </div>
    </main>

    <?php include 'assets/components/footer.html' ?>
  </body>
</html>

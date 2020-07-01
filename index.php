<?php include 'helper.php' ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php print_meta_tags(
      "homepage, development, ai, robots",
      "Home",
      "Homepage of @dev_philcomm, better known as Philipp Schlesinger",
      "https://philcomm.dev/")
    ?>

    <link rel="stylesheet" href="assets/css/master.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/typewriter.css">

    <script src="assets/js/typewriter.js" charset="utf-8"></script>
  </head>
  <body>
    <main>
      <div class="top">
        <div class="title">
          philipp schlesinger
        </div>
        <typewriter class="typewriter" data-period="2000" data-strings='[
          "self taught developer",
          "stuck in quarantine",
          "podcast creator",
          "long sleeper",
          "technology enthusiast",
          "lvl21 mage",
          "walking star wars encyclopedia",
          "spends too much money on tech",
          "wannabe ai expert",
          "master of bob-ombs in mario kart",
          "dungeon master"
          ]'></typewriter>
        <a class="arrow-down" href="#projects"><img src="assets/icons/chevron-down-solid.svg" alt="Scroll down"></a>
      </div>
      <div id="projects" class="projects">
        <div class="project">
          <a class="circle" href="https://open.spotify.com/show/76EijoNVHIGuwHnb533MtJ?si=Obkw4mLfTXCA4K8imDS6QA" rel="noreferrer" target="_blank">
            <img src="assets/icons/Pen-and-Blade-logo-large.png" alt="Pen & Blade logo">
          </a>
          <div class="description">
            Visit the P&B podcast
          </div>
        </div>
        <div class="project">
          <a class="circle" href="flappybird">
            <img src="assets/icons/brain-solid.svg" alt="AI logo">
          </a>
          <div class="description">
            FlappyBird AI project
          </div>
        </div>
      </div>
      <div class="about-me">
        <h1>about me</h1>
        <p>My name is Philcomm</p>
        <p>I am a mage.</p>
        <p>Level 21.</p>
        <p>
          In my eleventh year I became an orphan. When orcs raided my home town, I got split from my parents. A clan of druids found me and raised me as their own.
        </p>
        <p>
          I spend much time learning the mystic arts of magic, and have searched for ways to improve it.
        </p>
        <p>
          When I reached the 20th level, I decided to travel the lands of Germania to gain more XP and level up. I first came upon the humanoid city called Berlin.
        </p>
        <p>
          In this moment perhaps you are wondering... What is he talking about?
        </p>
        <p>
          Well, obviously this is not my real origin story, but it isn't far from the truth.<br>
          Replace 'magic' with 'development' and the story above is pretty damn accurate.
        </p>
        <p>
          My name is Philipp, I am a software developer currently located in Berlin, Germany.
        </p>
        <p>
          Software development is my passion, even if I am not at work.<br>
          At my job, I am mostly working with Android and Ruby on Rails.<br>
          In my freetime, I experiment with technologies such as AI, physics calculations and hardware encryption.
        </p>
        <p>
          When I am not developing (which is rarely the case), I like to hike, skate, read or play video games.
        </p>
        <p>
          In 2019, I came in touch with a Dungeons and Dragons YouTube channel called Pen & Blade. Since then, we work together on all sorts of content.<br>
          In July 2020, we started the Pen & Blade podcast, where we just casually talk about stuff we have an interest in.
        </p>
      </div>
    </main>

    <?php include 'assets/components/footer.html' ?>
  </body>
</html>

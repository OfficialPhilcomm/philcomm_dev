<!DOCTYPE html>
<html lang="de" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Aventerror</title>

    <link rel="stylesheet" href="css/master.css">

    <link rel="stylesheet" href="css/home.css">
  </head>
  <body>
    <header>
      <nav>
        <button onclick="window.location.href = 'index'" class="nav-button">Home</button>
        <button onclick="window.location.href = 'leadership'" class="nav-button">Leadership</button>
      </nav>
      <div class="top-box">
        <h1 class="no-margin">Aventerror</h1>
        <h2 class="no-margin">Größtes deutsches PokeMMO-Team</h2>
      </div>
      <img class="starters" src="img/starters.png" alt="asdad" />
    </header>

    <main>
      <div class="team-history">
        <h2>Teamgeschichte</h2>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </div>

      <div class="wrapper">
        <div class="info-box">
          <div class="info-circle">
            PVP
          </div>
          <div class="info-text">
            Viele teaminterne PVP-Events
          </div>
        </div>
        <div class="info-box">
          <div class="info-circle">
            Breeding
          </div>
          <div class="info-text">
            Wir helfen gerne beim Breeding
          </div>
        </div>
        <div class="info-box">
          <div class="info-circle">
            Discord
          </div>
          <div class="info-text">
            Unser Discord ist immer da, um euch zu helfen
          </div>
        </div>
      </div>
      <div class="wrapper-centered">
        <button class="primary" onclick="window.location.href = 'leadership'">Erfahre mehr über die Leitung</button>
      </div>
      <div class="wrapper-centered">
        <img class="team-picture" src="img/team.jpg" alt="">
      </div>
    </main>

    <?php include 'components/footer.html'; ?>
  </body>
</html>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>FlappyBird AI project</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/flappybird.css">

    <!-- Game Engine stuff -->
    <script src="flappybird_assets/js/p5.min.js"></script>
    <script src="flappybird_assets/js/p5.dom.min.js"></script>
    <script src="flappybird_assets/js/p5.sound.min.js"></script>
    <script src="flappybird_assets/js/p5.collide2d.min.js"></script>
    <script src="flappybird_assets/js/sketch.js"></script>

    <!-- // Neural Network stuff -->
    <script src="flappybird_assets/js/NeuralNetwork.js"></script>
    <script src="flappybird_assets/js/Matrix.js"></script>

    <!-- // My stuff -->
    <script src="flappybird_assets/js/Player.js"></script>
    <script src="flappybird_assets/js/Population.js"></script>

    <script src="flappybird_assets/js/Pipe.js"></script>
    <script src="flappybird_assets/js/PipePart.js"></script>

    <script src="flappybird_assets/js/Settings.js"></script>
    <script src="flappybird_assets/js/GenerationGraph.js"></script>
    <script src="flappybird_assets/js/Chart.min.js"></script>
  </head>
  <body>
    <main>
      <div class="text-section">
        <h1>flappy bird ai</h1>
      </div>

      <div id="visuals">
        <div id="sketch-holder"></div>
        <!--<div id="container"><canvas id="chart"></canvas></div>-->
      </div>

      <div id="settings">
        <table>
          <tr>
            <td colspan="2"><button onclick="loop()">Start</button><button onclick="noLoop()">Stop</button></td>
          </tr>
          <tr>
            <td colspan="2"><button onclick="population.killAll()">Kill all current</button></td>
          </tr>
          <tr>
            <td><span>Game speed</span></td>
            <td><span id="game_speed"></span></td>
          </tr>
          <tr>
            <td><span>Volume</span></td>
            <td><span id="volume"></span></td>
          </tr>
          <tr>
            <td><span>Remaining from generation</span></td>
            <td><span id="population_size"></span></td>
          </tr>
          <tr>
            <td><span>Generation size</span></td>
            <td><input type="number" min="10" max="200" id="population_size_input" /></td>
          </tr>
          <tr>
            <td><span>Mutation rate (%)</span></td>
            <td><input type="number" min="0.1" max="100" step="0.1" id="mutation_rate" /></td>
          </tr>
          <tr>
            <td><span>Generation</span></td>
            <td><span id="generation"></span></td>
          </tr>
          <tr>
            <td><span>Highscore</span></td>
            <td><span id="highscore"></span></td>
          </tr>
          <tr>
            <td><span>Error rate</span></td>
            <td><span id="error_rate"></span></td>
          </tr>
          <tr>
            <td><span>Nearly perfect since gen</span></td>
            <td><span id="np"></span></td>
          </tr>
        </table>
      </div>

      <div class="text-section">
        <h1>about the project</h1>
        <p>
          This project was my first ai project. It taught me how AI works and how to use it to make applications smarter.<br>
          At this time, I didn't have much experience with coding games, so forgive the code mess and the lack of a custom coordinate system.
        </p>
        <h1>how it works</h1>
        <p>
          In every generation, there is an x amount of players. Each player is equipped with a brain. It also keeps the state if the player is dead or not.
        </p>
        <p>
          The brain, or neural network, gets 5 inputs:
        </p>
        <ul>
          <li>y location of the player</li>
          <li>y bottom location of the top pipe</li>
          <li>y top location of the bottom pipe</li>
          <li>x location of the closest pipe</li>
          <li>the current y velocity, ignoring the gravity</li>
        </ul>
        <p>
          When all players of a generation are dead, the best is taken by its travel distance.<br>
          Then, the next generation gets filled with copies of the best one of the last generation.<br>
          Last step, every one except one gets mutated by 5%. This ensures the last best one still exists in the new generation.
        </p>
        <p>
          This procedure has some problems, but it works for that situation.
        </p>
      </div>
    </main>

    <?php include 'footer.html' ?>
  </body>
</html>

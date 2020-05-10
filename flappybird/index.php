<html>
<head>
  <title>The most amazing flappy bird</title>

  <!-- Game Engine stuff -->
  <script src="js/p5.min.js"></script>
  <script src="js/p5.dom.min.js"></script>
  <script src="js/p5.sound.min.js"></script>
  <script src="js/p5.collide2d.min.js"></script>
  <script src="js/sketch.js"></script>

  <!-- // Neural Network stuff -->
  <script src="js/NeuralNetwork.js"></script>
  <script src="js/Matrix.js"></script>

  <!-- // My stuff -->
  <script src="js/Player.js"></script>
  <script src="js/Population.js"></script>

  <script src="js/Pipe.js"></script>
  <script src="js/PipePart.js"></script>

  <script src="js/Settings.js"></script>
  <script src="js/GenerationGraph.js"></script>
  <script src="js/Chart.min.js"></script>

  <link rel="stylesheet" type="text/css" href="style.css" />
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />

</head>
<body>
  <h1>This is my version of a Flappy Bird AI</h1>
  <div id="visuals">
    <div id="sketch-holder"></div>
    <div id="container"><canvas id="chart"></canvas></div>
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
</body>
</html>

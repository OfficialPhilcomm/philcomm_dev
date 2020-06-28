var image_background;

var population;

var best_saved;

var game_speed_slider;

var mutation_rate_input;

var generation;
var generationSpan;

var highscore;
var highscoreSpan;

var error_rate_span;

var np;
var npGeneration;
var npSpan;

var genGraph;

var image_player;

var pipes;
var image_pipe;
var image_pipe_end;

var sound_jump;
var sound_pass;
var sound_death;

var sound_cooldown;

function preload() {
  //some sound and image loading stuff here
  image_background = loadImage("flappybird_assets/sprites/background.png");

  image_player = loadImage("flappybird_assets/sprites/player.png");

  image_pipe = loadImage("flappybird_assets/sprites/pipe.png");
  image_pipe_end = image_pipe.get(0,0,16,16);

  sound_jump = loadSound("flappybird_assets/sounds/jump.mp3");
  sound_jump.amp(Settings.volume * 0.5);

  sound_pass = loadSound("flappybird_assets/sounds/pass.mp3");
  sound_pass.amp(Settings.volume);

  sound_death = loadSound("flappybird_assets/sounds/death.mp3");
  sound_death.amp(Settings.volume);

  sound_cooldown = 0;
}

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.id("flappy-canvas");
  canvas.parent("sketch-holder");
  game_speed_slider = createSlider(1, 64, Settings.default_game_speed);
  game_speed_slider.parent("game_speed");
  mutation_rate_input = document.getElementById("mutation_rate");
  mutation_rate_input.value = Settings.mutation_rate * 100;
  best_saved = false;
  generation = 1;
  generationSpan = select("#generation");
  highscore = 0;
  highscoreSpan = select("#highscore");
  error_rate_span = select("#error_rate");
  np = false;
  npValue = 0;
  npSpan = select("#np");
  // genGraph = new GenerationGraph();

  population = new Population();
  newGame(true); // setup a new game instance
}

function draw() {

  let next_pipe;

  for(let i = 0; i < game_speed_slider.value(); i++) {
    // sound amplifier
    Settings.volume = 0 / 100;
    sound_jump.amp(Settings.volume * 0.5);
    sound_pass.amp(Settings.volume);
    sound_death.amp(Settings.volume);

    // add new pipes if needed
    addNewPipes();
    // calculate next pipe
    next_pipe = calculateNextPipe();

    // AI is thinking
    for(let i = 0; i < population.population.length; i++) {
      population.population[i].think(next_pipe);
      population.population[i].refresh();
    }
    population.refresh();

    for(let i = 0; i < pipes.length; i++) {
      pipes[i].move();
    }
    removePipes();

    // calculate new score
    let play_sound = false;
    for(let i = 0; i < pipes.length; i++) {
      if(Settings.player_x > pipes[i].x + pipes[i].width && !pipes[i].passed) {
        pipes[i].passed = true;
        population.addScorePoint();
        play_sound = true;
      }
    }
    if(Settings.sound_on && play_sound) sound_pass.play();
    if(Settings.kill_auto && population.score >= Settings.kill_auto_on) population.killAll();
    if(population.allDead()) newGame();

    // refresh nearly perfect value
    renewHighscore(population.score);
    renewNearlyPerfect(population.score);
    checkForBestSave(population.score);

    // new sound_cooldown
    refreshSoundCooldown();
    setMutationRate();
  }

  // displayin gstuff

  background(image_background);
  noStroke();
  noSmooth();

  // render pipes
  for(let i = 0; i < pipes.length; i++) {
    if(pipes[i] == next_pipe) {
      pipes[i].update(true);
    } else {
      pipes[i].update();
    }
  }

  // render player
  for(let i = 0; i < population.population.length; i++) {
    population.population[i].update();
  }

  // print score
  printScore();

}

function setMutationRate() {
  Settings.mutation_rate = parseInt(mutation_rate_input.value) / 100;
}

function setSoundCooldown() {
  sound_cooldown = 10;
}
function printScore() {
  fill(255);
  textSize(42);
  if(Settings.print_score) text(population.score, 8, 40);
}

function newGame(first) {
  // refresh generation span
  if(!first) generation += 1;
  renewGeneration();

  // delete existing pipes and create new pipes
  calculateFitness();
  pipes = [];
  addPipe(Settings.player_x + Settings.pipe_distance);

  // reset player
  //population = new Population();
  if(first) {
    population = new Population();
    renewHighscore(0);
  } else {
    nextGeneration();
  }
}

function nextGeneration() {
  // genGraph.addGen(generation-1, calculateErrorRate());

  let parent = pickParent();
  renewHighscore(parent.score);
  population = new Population(pickParent());
}

function checkForBestSave(score) {
  if(score >= 1000 && !best_saved && Settings.save_best) {
    let json = JSON.parse(population.population[0].brain.serialize());
    save(json, "bestFlappyBird", "json");
    best_saved = true;
  }
}

function renewGeneration() {
  generationSpan.html(generation);
}
function renewHighscore(score) {
  if(score > highscore || highscore === 0) {
    highscore = score;
    highscoreSpan.html(highscore + " (gen " + generation + ")");
    error_rate_span.html(calculateErrorRate().toString().substring(0, 10) + "%");
  }
}
function renewNearlyPerfect(score) {
  if(score >= Settings.nearly_perfect_rate && !np) {
    np = true;
    npValue = generation;
    npSpan.html(npValue);
  } else if(!np && score < Settings.nearly_perfect_rate) {
    npSpan.html("---");
  }
}
function calculateErrorRate() {
  return abs(100 / (highscore + 1));
}

function calculateFitness() {
  let sum = 0;
  for (let i = 0; i < population.dead_players.length; i++) {
    sum += population.dead_players[i].travelled;
  }
  for (let i = 0; i < population.dead_players.length; i++) {
    population.dead_players[i].calculateFitness(sum);
  }
}

function addNewPipes() {
  while(width - (pipes[pipes.length-1].x + pipes[pipes.length-1].width) > Settings.pipe_distance) {
    addPipe((pipes[pipes.length-1].x + pipes[pipes.length-1].width) + Settings.pipe_distance);
  }
}
function addPipe(x) {
  pipes.push(new Pipe(x));
}
function removePipes() {
  while((pipes.length >= 1) && (pipes[0].x + pipes[0].width < 0)) {
    pipes.shift();
  }
}

// not my code/function
function mutate(x) {
  if(random(1) < Settings.mutation_rate) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

/*function pickParent() {
  let index = 0;
  let r = random(1);

  print(population.dead_players);

  while(r > 0) {
    r = r - population.dead_players[index].fitness;
    index += 1;
  }
  index -= 1;

  let player = population.dead_players[index];
  let child = new Player(player.brain);
  child.mutate();
  return child;
}*/

function pickParent() {
  let best_player = new Player(height / 2, Settings.player_width, Settings.player_height);
  for(let i = 0; i < population.dead_players.length; i++) {
    if(population.dead_players[i].fitness > best_player.fitness) {
      best_player = population.dead_players[i];
    }
  }
  return best_player;
}

function refreshSoundCooldown() {
  if(sound_cooldown > 0) {
    sound_cooldown -= 1;
  }
}

function calculateNextPipe() {
  let next_pipe = pipes[0];
  for(let i = 0; i < pipes.length; i++) {
    if(!pipes[i].passed) {
      next_pipe = pipes[i];
      i = pipes.length;
    }
  }
  return next_pipe;
}

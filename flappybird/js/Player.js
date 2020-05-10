class Player {
  constructor(y, width, height, brain) {
    this.x = Settings.player_x;
    this.y = y;
    this.width = width;
    this.height = height;

    // for fitness calculation
    this.fitness = 0;
    this.score = 0;
    this.travelled = 0;
    this.passed = [];

    this.dead = false;

    this.y_velocity = 0; // affects how much player is affected by gravity, gets high on jump

    // AI stuff
    this.brain;
    if(brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, Settings.node_amount, 2);
    }
  }

  jump() { // simulate jump of player
    this.y_velocity = Settings.jump_force;
    if(Settings.sound_on && sound_cooldown === 0 && !Settings.only_score){
      sound_jump.play();
      setSoundCooldown();
    }
  }

  think(pipe) {
    let inputs = [];
    inputs[0] = (this.y + (this.height / 2)) / height; // y location of the player
    inputs[1] = (pipe.top_pipe.y + pipe.top_pipe.height) / height; // y bottom location of the top pipe
    inputs[2] = pipe.bottom_pipe.y / height;
    inputs[3] = pipe.x / width; // x location of the closest pipe
    inputs[4] = this.y_velocity / Settings.jump_force;

    let action = this.brain.predict(inputs);
    if(action[1] > action[0]) {
      this.jump();
    }
  }

  mutate() {
    this.brain.mutate(mutate);
  }

  kill() { // kills player
    this.dead = true;
    if(Settings.sound_on && !Settings.only_score) sound_death.play();
    //print("killed on " + this.travelled + " with " + this.score + " pipes passed");
  }

  addScorePoint() {
    this.score += 1;
  }

  calculateFitness(sum) {
    this.fitness = this.travelled / sum;
    //print(this.fitness);
  }

  update() {
    // print char
    image(image_player, this.x, this.y, this.width, this.height);
  }

  refresh() { // happens for every frame
    // apply gravity
    if(!this.dead) {
      let intersect = false;
      for(let i = 0; i < pipes.length; i++) {
        if(pipes[i].intersects(this)) intersect = true;
      }

      // calculate collision
      if(intersect || this.y <= 0 || this.y + this.height > width) {
        this.kill();
      }

      this.travelled += 1;
      this.y += (Settings.gravity + -this.y_velocity);
      this.y_velocity *= 0.9;
      if(this.y_velocity < 0.1) this.y_velocity = 0;
      /*if(this.y + this.height > height) {
        this.y = height - this.height;
      }*/
    }
  }
}

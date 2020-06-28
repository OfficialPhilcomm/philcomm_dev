class Population {
  constructor(parent) {
    this.population = [];
    this.dead_players = [];
    this.score = 0;
    for(let i = 0; i < Settings.population_size; i++) {
      if(parent instanceof Player) {
        this.population[i] = new Player(height / 2, Settings.player_width, Settings.player_height, parent.brain);
        if(i !== 1) this.population[i].mutate();
      } else {
        this.population[i] = new Player(height / 2, Settings.player_width, Settings.player_height);
      }
    }
  }
  addScorePoint() {
    for(let i = 0; i < this.population.length; i++) {
      this.population[i].addScorePoint();
    }
    this.score += 1;
  }
  killAll() {
    for(let i = 0; i < this.population.length; i++) {
      this.population[i].kill();
      print(this.population[0].dead);
    }
  }
  allDead() {
    if(this.population.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  pick() {
    let player = random(this.dead_players);
    let child = new Player(height / 2, Settings.player_width, Settings.player_height, player.brain);
    //child.mutate();
    return child;
  }
  refresh() {
    for(let i = 0; i < this.population.length; i++) {
      if(this.population[i].dead) {
        this.dead_players.push(this.population.splice(i, 1)[0]);
      }
    }
  }
}

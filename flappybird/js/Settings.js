class Settings {
  constructor() {
  }
}
Settings.pipe_distance = 250;
Settings.pipe_width = 50;
Settings.pipe_space = 100;
Settings.pipe_speed = 2;

Settings.player_x = 50;
Settings.player_width = 35;
Settings.player_height = 35;
Settings.jump_force = /*14*/24;
Settings.gravity = /*7*/12;
Settings.controls_on = false;

Settings.sound_on = true;
Settings.only_score = true;
Settings.volume = 0;

Settings.print_score = true;

Settings.default_game_speed = 1;

// AI settings
Settings.population_size = 100;
Settings.node_amount = 8;
Settings.mutation_rate = 0.05;
Settings.nearly_perfect_rate = 500;
Settings.save_best = false;
Settings.kill_auto = true;
Settings.kill_auto_on = 500;

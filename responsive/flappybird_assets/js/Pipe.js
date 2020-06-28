class Pipe {
  constructor(x) {
    this.x = x;
    this.width = Settings.pipe_width;
    this.space = Settings.pipe_space;
    this.top_pipe = new PipePart(this.x, 0, this.width, floor(random(0,height - this.space)));
    this.bottom_pipe = new PipePart(this.x, this.top_pipe.height + this.space, this.width, height - this.top_pipe.height - this.space);
    this.passed = false;
  }

  move() {
    this.x -= Settings.pipe_speed;
    this.top_pipe.x = this.x;
    this.bottom_pipe.x = this.x;
  }

  update(red) {
    //scale(1.0,-1.0);
    if(red !== undefined) {
      fill(66, 170, 191);
    } else {
      fill(109, 209, 73);
    }
    rect(this.top_pipe.x, this.top_pipe.y, this.top_pipe.width, this.top_pipe.height);
    rect(this.bottom_pipe.x, this.bottom_pipe.y, this.bottom_pipe.width, this.bottom_pipe.height);
  }

  intersects(player) {
    let intersect = collideRectRect(this.top_pipe.x,this.top_pipe.y,this.top_pipe.width,this.top_pipe.height,player.x,player.y,player.width,player.height);
    if(!intersect) intersect = collideRectRect(this.bottom_pipe.x,this.bottom_pipe.y,this.bottom_pipe.width,this.bottom_pipe.height,player.x,player.y,player.width,player.height);
    return intersect;
  }
}

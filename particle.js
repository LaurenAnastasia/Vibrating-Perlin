//Code sourced from Daniel Shiffman
//Special thanks to Leo Ott IV


class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vib = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
    this.prevVib = this.vib.copy();
    this.tweenCount = 0;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }
  
  vibrate(vibration){
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var vib = vibration[index];
    this.vib = vib;
  }

  show() {
    let clrs = [[4, 0, 250], [227, 113, 68], [230, 65, 0], [255, 255, 255]];
    let tweenStep = 360;
    let color3f = (floor(this.tweenCount / tweenStep)+1)%4;
    let color3i = (floor(this.tweenCount / tweenStep))%4;
    let r = (clrs[color3f][0] - clrs[color3i][0])/tweenStep;
    let g = (clrs[color3f][1] - clrs[color3i][1])/tweenStep;
    let b = (clrs[color3f][2] - clrs[color3i][2])/tweenStep;
    let rf = clrs[color3i][0] + r * (this.tweenCount % tweenStep);
    let gf = clrs[color3i][1] + g * (this.tweenCount % tweenStep);
    let bf = clrs[color3i][2] + b * (this.tweenCount % tweenStep);
    this.tweenCount++;
    stroke(rf, gf, bf, 10);
    strokeWeight(2);
    line(this.pos.x + this.vib.x, this.pos.y + this.vib.y, this.prevPos.x + this.prevVib.x, this.prevPos.y + this.prevVib.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
    this.prevVib.x = this.vib.x;
    this.prevVib.y = this.vib.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }

}
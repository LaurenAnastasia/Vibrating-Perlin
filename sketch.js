var inc = 0.1;
var scl = 200;
var vibAmp = 0.05;
var particleCount = 100;
var cols, rows;

var zoff = 0;

var vibSign = 1;

var fr;

var particles = [];

var flowfield;
var vibfield;

function preload(){
  sound = loadSound('assets/Chonks.mp3');
}

function setup() {
  createCanvas(600, 400);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  fft = new p5.FFT();
  sound.amp(0.5);
  sound.loop();

  flowfield = new Array(cols);
  vibfield = new Array(cols);

  for (var i = 0; i < particleCount; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  
  let spectrum = fft.analyze();
  let len = spectrum.length;
  yoff = 0;
  for (var i = 0; i < particles.length; i++) {
    var xoff = i * 0.005;
    var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
    var v = p5.Vector.fromAngle(angle);
    v.setMag(1);
    flowfield[i] = v;
    var vib = createVector(0,0);
    if (i < len){
      mag = spectrum[i] * vibSign;
      var x = mag * vibAmp * Math.sin(angle + PI / 2);
      var y = mag * vibAmp * Math.cos(angle + PI / 2);
      vib = createVector(x,y);
    }
    vibfield[i] = vib;
    xoff += inc;
    stroke(0, 50);
    yoff += inc;
    zoff += 0.0003;
  }
  if (vibSign == 1){
    vibSign = -1;
  } else {
    vibSign = 1;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].vibrate(vibfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
}
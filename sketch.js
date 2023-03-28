const boxCount = 150;
const sideLen = 5;
const noiseScale = 0.005;
const noiseOffset = 100;

const minHeight = 1;
const maxHeight = 200;

const seaLevel = 0.4;
const sandLevel = 0.5;
const grassLevel = 0.6;
const mountainLevel = 0.8;

const seaFloorColour = "#d4bea0";
const sandColour = "#d6cba5";
const grassColour = "#4e993f";
const mountainColour = "#3c802f";


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noStroke();

}

function draw() {
  background(220);
  rotateX(60);

  generateTerrain();
  generateWater();
}

function generateWater() {
  push();
  var waterHeight = map(seaLevel, 0, 1, minHeight, maxHeight);
  var waterSize = boxCount * sideLen - 0.01;
  translate(-sideLen/2, -sideLen/2, waterHeight/2);
  fill(22, 164, 192, 120);
  box(waterSize, waterSize, waterHeight);
  pop();
}

function generateTerrain() {
  for(var i = 0; i < boxCount; i++) {
    for(var j = 0; j < boxCount; j++) {
      var x = i * sideLen - (boxCount * sideLen) / 2;
      var y = j * sideLen - (boxCount * sideLen) / 2;
      drawBox(x, y);
    }
  }
}

function drawBox(x, y) {
  var noise = getNoiseAt(x, y);
  var height = map(noise, 0, 1, minHeight, maxHeight);
  var colour = getColour(noise);

  push();
  translate(x, y, height/2);
  fill(colour);
  box(sideLen, sideLen, height);
  pop();
}

function getNoiseAt(x, y) {
  return noise(x*noiseScale+noiseOffset, y*noiseScale+noiseOffset);
}

function getColour(height) {
  if(height < seaLevel) { return seaFloorColour; }
  else if(height < sandLevel) { return sandColour; }
  else if(height < grassLevel) { return grassColour; }
  else { return mountainColour; }

}
var cache;

var inputSeed;
var inputIslandSize;

function setup() {
  let cnv = createCanvas(Settings.map_width, Settings.map_height);
  cnv.parent('container');

  cache = {
    seed: undefined,
    island_size: undefined
  };

  inputSeed = select("#control_seed");
  inputSeed.value(99);

  inputIslandSize = select("#control_island_size");
}

function draw() {
  let change = false;

  if(inputSeed.value() != cache.seed) change = true;
  if(inputIslandSize.value() != cache.island_size) change = true;

  if(change) renderMap();
}

function renderMap() {
  noiseSeed(inputSeed.value());
  background(66, 194, 245);
  noStroke();
  for(let x = 0; x < Settings.map_width; x++) {
    for(let y = 0; y < Settings.map_height; y++) {
      let value = constrain(noise(x / inputIslandSize.value(), y / inputIslandSize.value()) * getFalloffValue(x, y), 0, 1);
      let translated_color = getBiomeColor(value);
      fill(translated_color.r, translated_color.g, translated_color.b);
      rect(x, y, 1, 1);
    }
  }

  cache.seed = inputSeed.value();
  cache.island_size = inputIslandSize.value();
}

function getFalloffValue(x, y) {
  let valueX = ((x * 2) - (Settings.map_width)) / Settings.map_width;
  let valueY = ((y * 2) - (Settings.map_height)) / Settings.map_height;

  let falloff_start = 0.5;

  max_val = Math.max(Math.abs(valueX), Math.abs(valueY));
  if (Math.abs(max_val) <= falloff_start) return 1
  else {
    z = max_val - falloff_start;
    root = 1-falloff_start;
    return -1 * (z-root) * (z+root) / root / root;
  }

  return (valueX > valueY) ? valueX : valueY;
}

function getBiomeColor(height) {
  height = map(height, 0, 1, 0, 100);
  if(height <= 26) {
    //deep water
    return { r: 56, g: 98, b: 187 };
  } else if (height <= 41) {
    //water shallow
    return { r: 59, g: 101, b: 194 };
  } else if (height <= 43) {
    //sand
    return { r: 207, g: 214, b: 130 };
  } else if (height <= 54) {
    //grass
    return { r: 90, g: 167, b: 27 };
  } else if (height <= 60) {
    //dark grass
    return { r: 68, g: 115, b: 24 };
  } else if (height <= 70) {
    //rock
    return { r: 90, g: 65, b: 62 };
  } else if (height <= 74) {
    //rock 2
    return { r: 153, g: 153, b: 153 };
  } else {
    //snow
    return { r: 255, g: 255, b: 255 };
  }
}

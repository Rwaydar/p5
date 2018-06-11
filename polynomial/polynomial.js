let x_vals = [];
let y_vals = [];
let a, b, c;
let aStore, bStore, cStore;
let li = true;
let qu = false;
let cu = false;
let qa = false;
let showPrediction = false;
let dragging = false;
learningRate = 0.05;
const optimizer = tf.train.adam(learningRate);

function setup() {
  createCanvas(600, 600);

  linear = createButton("Linear");
  quadratic = createButton("Quadratic");
  cubic = createButton("Cubic");
  quartic = createButton("Quartic");
  linear.mousePressed(linearData);
  quadratic.mousePressed(quadraticData);
  cubic.mousePressed(cubicData);
  quartic.mousePressed(quarticData);

  a = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));
  c = tf.variable(tf.scalar(random(-1, 1)));
  d = tf.variable(tf.scalar(random(-1, 1)));
  e = tf.variable(tf.scalar(random(-1, 1)));
}

function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}


function predict(x_vals) {
  //y = ax^2 + bx + c
  const xs = tf.tensor1d(x_vals);
  ys = tf.scalar(0);
  if (li === true) {
    ys = xs.mul(a).add(b);
  } else if (qu === true) {
    ys = xs.square().mul(a).add(xs.mul(b)).add(c);
  } else if (cu === true) {
    ys = xs.pow(tf.scalar(3)).mul(a)
    .add(xs.square().mul(b))
    .add(xs.mul(c))
    .add(d);
  } else if (qa === true) {
    ys = xs.pow(tf.scalar(4)).mul(a)
    .add(xs.pow(tf.scalar(3)).mul(b))
    .add(xs.square().mul(c))
    .add(xs.mul(d))
    .add(e);
  }
  return ys;
}

function linearData () {
  li = true;
  qu = false;
  cu = false;
  qa = false;
}

function quadraticData () {
  li = false;
  qu = true;
  cu = false;
  qa = false;
}

function cubicData () {
  li = false;
  qu = false;
  cu = true;
  qa = false;
}

function quarticData() {
  li = false;
  qu = false;
  cu = false;
  qa = true;
  learningRate = 0.5;
}

function mousePressed() {
  dragging = true;
}

function mouseReleased() {
  dragging = false;
  showPrediction = true;
}

function draw () {
  if(dragging) {
    if ((mouseX < width) && (mouseY < height)) {
      let x = map(mouseX, 0, width, -1, 1);
      let y = map(mouseY, 0, height, 1, -1);
      x_vals.push(x);
      y_vals.push(y);
    }
  } else {
  tf.tidy(() => {
    if(x_vals.length > 0) {
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(() => loss(predict(x_vals), ys));
    }
  });
  }
  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < x_vals.length; i++) {
    let px = map(x_vals[i], -1, 1, 0, width);
    let py = map(y_vals[i], -1, 1, height, 0)
    vertex(px, py);
  }
  endShape();

  const curveX = [];
   for (let x = -1; x <= 1.01; x += 0.05) {
     curveX.push(x);
   }

   const ys = tf.tidy(() => predict(curveX));
   let curveY = ys.dataSync();
   ys.dispose();

   if (showPrediction === true){
     beginShape();
     noFill();
     stroke(255);
     strokeWeight(2);
     for (let i = 0; i < curveX.length; i++) {
       let x = map(curveX[i], -1, 1, 0, width);
       let y = map(curveY[i], -1, 1, height, 0);
       vertex(x, y);
     }
     endShape();
   }


   // console.log(tf.memory().numTensors);
 }

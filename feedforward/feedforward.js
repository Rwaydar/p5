//Configuration
const LearningRate = 0.5;

//Create Network
const model = tf.sequential();

//Create Hidden Layer
const hidden = tf.layers.dense({
  units: 10, //Number of Nodes
  inputShape: [2], //Input Shape
  activation: 'sigmoid' //Activation Function
});

//Create Output Layer
const output = tf.layers.dense({
  units: 1,
  //Input Shape Inferred from Previous Layer
  activation: 'sigmoid'
});

//Add Layers to the Network
model.add(hidden);
model.add(output);

//Create the Optimizer
const sgdOpt = tf.train.sgd(LearningRate);

//Compile the Network with Optimizer and Loss
model.compile({
  optimizer: sgdOpt,
  loss: tf.losses.meanSquaredError
});

//Dummy Data
const xs = tf.tensor2d([
  [0, 0],
  [1, 1],
  [0.5, 0.5]
]);

const ys = tf.tensor2d([
  [1],
  [0.5],
  [0]
]);

train().then(() => {
  console.log("Training Complete");
  let outputs = model.predict(xs);
  outputs.print();
});


async function train () {

  for (let i = 100; i > 0; i--) {
    const config = {
      shuffle: true,
      epochs: 100
    }
    console.log("Iteration: ", i);
    const response = await model.fit(xs, ys, config);
    console.log(response.history.loss[0]);
  }
}

//model.fit(xs, ys).then((response) => console.log(response.history.loss[0]));

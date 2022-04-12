require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('../load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

let { features, labels, testFeatures, testLabels } = loadCSV('../data/cars.csv', {
  shuffle: true,
  splitTest: 100,
  dataColumns: ['horsepower', 'weight', 'displacement'],
  labelColumns: ['mpg'],
});

// console.log('index features', features);
// console.log('index test features', testFeatures);
console.log('index labels', labels);

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 40,
  batchSize: 10,
});

regression.train();

const r2 = regression.test(testFeatures, testLabels);

plot({
  x: regression.mseHistory.reverse(),
  xLabel: 'Iteration #',
  yLabel: 'Mean Squared Error',
});

console.log('R2 is', r2);

// regression.predict([[120, 2, 380]]).print();
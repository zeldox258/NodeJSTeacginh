const [hello, sum, divide] = require('./func.js');

const result = hello('Ola');
const result2 = sum(2,3);
const result3 = divide(10,2);

const figlet = require('figlet');

figlet('Olaaa', (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});
const figlet = require('figlet');

figlet('My name is Arshya', (err, data) => {
  if (err) {
    console.log('Something is incorrect...');
    console.dir(err);
    return;
  }
  console.log(data);
});
const crypto = require('crypto');

function getRandomId(){
    const  number = crypto.randomBytes(16);
    return number.toString('hex');
}

const value = getRandomId();

//console.log(value);


function add2(a,b){
    return a + b;
}

function add3(a,b){
    return a - b;
}

module.exports = [add2,add3];




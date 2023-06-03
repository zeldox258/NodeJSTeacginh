
//can you export 3 function and use them inside of another file.



function sum (a,b) {
    
    return a+b
}

function rest (a,b) {
    
    return a-b
}

function multiplication (a,b) {
    
    return a*b
}

const express = require('express');



const app = express();
const PORT = 3000;


app.use(express.json());



let cars = [
    {name:"Audi"},
    {name:"Volvo"},
    {name:"BMW"},
]

//Routes
app.get('/getCars',(req,res)=>{
    res.json(cars);
})

app.get('/getFirst',(req,res)=>{
    res.json(cars[0]);
})


app.post('/addCars',(req,res)=>{

    console.log(req);
    console.log(req.body);

    
    const newCar = {
        name: "req.body.name"
    }

    cars.push(newCar);

    res.status(201).json({ msg: 'Car created successfully' });

})



app.listen(PORT, ()=>{
    console.log("Server has started at port",PORT,"you can Go to link from here "+`http://localhost:${PORT}`);
})


const figlet = require('figlet');

figlet('- * / + % $ # @', (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});

module.exports = [sum,rest,multiplication];
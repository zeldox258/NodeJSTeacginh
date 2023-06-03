const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3010;


app.use(express.json());
app.use(cors()); // Enable CORS for all routes



let cars = [
    {name:"Audi"},
    {name:"Volvo"},
    {name:"BMW"},
]

//Routes
app.get('/getCars',(req,res)=>{
    console.log("Recieved getCars");
    res.json(cars);
})

app.get('/getFirst',(req,res)=>{
    console.log("Recieved getFirst");

    res.json(cars[0]);
})


app.post('/addCars',(req,res)=>{
    console.log("Recieved addCars");

    /*console.log(req);
    console.log(req.body);*/

    
    const newCar = {
        name: req.body.name
    }

    cars.push(newCar);

    res.status(201).json({ msg: 'Car created successfully' });

})




app.post('/deleteCars',(req,res)=>{
    console.log("Recieved deleteCars");

    /*console.log(req);
    console.log(req.body);*/
    const nameOfTheCar = req.body.name;
    
    for(let i = 0 ; i < cars.length;i++){
        if(cars[i].name === nameOfTheCar){
            
            cars.splice(i, 1);
            res.status(201).json({ msg: 'Car deleted successfully' });
        }
    }
    

    res.status(501).json({ msg: 'there is no matched car' });

})



app.listen(PORT, ()=>{
    console.log("Server has started at port",PORT,"you can Go to link from here "+`http://localhost:${PORT}`);
})



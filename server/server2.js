const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');




const app = express();
const PORT = 3010;



app.use(express.json());
app.use(cors()); // Enable CORS for all routes



function connectToMongoDB(uri) {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    const db = mongoose.connection;
  
    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
  
    db.once('open', () => {
      console.log('Connected to MongoDB successfully!');
    });
  }
  
  const uri = 'mongodb://localhost:27017/DBcars';
  connectToMongoDB(uri);


const carSchema = new mongoose.Schema({
    name:String,
    quantity:Number
});

const playerSchema = new mongoose.Schema({
    name:String,
    age:Number,
    position:String,
    overall:Number
});
const Player = mongoose.model('players',playerSchema);


async function getAllPlayers(){
    let result = [];
    try{
        const allPlayers = await Player.find({});


        await allPlayers.forEach((item)=>{ result.push(item); });
        
    }
    catch(error){
        console.log(error);
    }
    
    return result;
}

async function getPlayerByName(name){
    let result;
    try{
        const allPlayers = await Player.find({name:name});

            await allPlayers.forEach((item)=>{ result = item; });
        
    }
    catch(error){
        console.log(error);
        return NULL;
    }
    return result;
}


async function updatePlayerByName(name,overall){//overall can be -1 or 1 in this case
    try{

        const playerDetails = await getPlayerByName(name);
        let newOverall = playerDetails.overall + overall;   
        const result = await Player.updateOne({name : name},{ $set: { overall: newOverall } })

    }
    catch(error){
        console.log(error);
        return error;
    }

}



async function addPlayer(player){
    try{
        const result = await Player.insertMany([player]);
    }
    catch(error){
        return error;
    }
    return "Added Successfully";
}

app.get('/getPlayers',async (req,res)=>{
    console.log("Recieved getFirst");
    let result = await getAllPlayers();
    res.json(result[0]);
})


app.post('/addPlayer',async (req,res)=>{
    console.log("Recieved addCars");


    const newPlayer = new Player({
        name: req.body.name,
        age:req.body.age,
        position:req.body.position,
        overall:req.body.overall
    });

    const resp = await addPlayer(newPlayer);

    res.status(201).json({ msg: resp });

})


app.post('/increaseOverall',async (req,res)=>{
    console.log("Recieved increaseOverall");
    
    let newPlayer = req.body.name;

    const resp = await updatePlayerByName(newPlayer,1);

    res.status(201).json({ msg: resp });

})


app.post('/decreaseOverall',async (req,res)=>{
    console.log("Decreased player's overall");

    let newPlayer = req.body.name;
    const resp = await updatePlayerByName(newPlayer,-1);

    res.status(201).json({ msg: resp });

})





/*

playerSchema (name, age, position, overall)
modelName : players 

4 function
DONE <-> 1-Add new Player (all details will come from body)
DONE <-> 2-Increase overall by one(name)
DONE <-> 3-Decrease overall by one(name)
DONE <-> 4-getAllPlayers end point

4 endpoint
1-Add new Player (all details will come from body)
2-Increase overall by one(name)
3-Decrease overall by one(name)
4-getAllPlayers end point
*/

const Car = mongoose.model('cars',carSchema);


let audi = new Car({
    name:"Auid",
    quantity:10
});

let volvo = new Car({
    name:"Volvo",
    quantity:15
});


let porsche = new Car({
    name:"Porsche",
    quantity:20
});

//console.log(audi);

/*
Car.insertMany([audi],function(err){

    if(err){
        console.log("There is an error while getting the car");
    }
    else{
        console.log("Car first added succesfully");
    }


});*/



/*
Car.insertMany([audi])
.then(()=>{
    console.log("Car second added successfully")
})
.catch((error) =>{
    console.log(error);
});
*/

/*
porsche.save()
  .then(savedDoc => {
    console.log('Car saved:', savedDoc);
    // Perform further actions if needed
  })
  .catch(error => console.error('Error saving document:', error));


*/


async function printAllTheDataFromModel(model){
        
    const result = await model.find({});

      result.forEach((item)=>{ console.log(item)});
}

/*
printAllTheDataFromModel(Car);




/*
const client = new MongoClient(uri);
let database;
let carsCollection;
//mongoose
let cars = [
    {
        name:"Audi",
        quantity:20
    },
    {
        name:"Volvo",
        quantity:10
    },
    {
        name:"BMW",
        quantity:5
    },
]

async function startServer(){
    await client.connect();
    database = client.db("DBcars");
    carsCollection = database.collection('cars');
    //const result = await carsCollection.insertMany(cars);
    //let result = await getAllCars();
    //console.log(result);
}
*/

async function getAllCars(){
    let result = [];
    try{
        const allCars = await Car.find({});


        await allCars.forEach((item)=>{ result.push(item); });
        
    }
    catch(error){
        console.log(error);
    }
    
    return result;
}



async function getCarByName(name){
    let result;
    try{
        const allCars = await Car.find({name:name});

            await allCars.forEach((item)=>{ result = item; });
        
    }
    catch(error){
        console.log(error);
        return NULL;
    }
    return result;
}

async function updateCarByName(name,quant){
    try{
        const carDetails = await getCarByName(name);

        console.log(carDetails);
            

        if(carDetails.quantity < quant){
            return 'We don t have enough car, our car Number:'+ carDetails.quantity;
        }
        else{
            carDetails.quantity= carDetails.quantity - quant;
            //console.log("Am I alive");
            if(carDetails.quantity === 0){
                deleteCarByName(name);
            }
            else{
                const result = await Car.updateOne({name : name},{ $set: { quantity: carDetails.quantity } })
            }

            if(quant < 0){
                return "Car quant added successfully";
            }
            return 'Car sold successfully';                
        }
    }
    catch(error){
        console.log(error);
        return error;
    }

}

async function deleteCarByName(carName){
    try{
        const result = await Car.findOneAndDelete({name:carName});
    }
    catch(error){
        return error;
    }
    return "deleted Successfully";

}

async function addCar(car){
    try{
        const result = await Car.insertMany([car]);
    }
    catch(error){
        return error;
    }
    return "Added Successfully";
}







let cars = [
    {
        name:"Audi",
        quantity:20
    },
    {
        name:"Volvo",
        quantity:10
    },
    {
        name:"BMW",
        quantity:5
    },
]




//Routes
app.get('/getCars', async (req,res)=>{
    console.log("Recieved getCars");
    let result = await getAllCars();
    res.json(result);
})

app.get('/getFirst',async (req,res)=>{
    console.log("Recieved getFirst");
    let result = await getAllCars();
    res.json(result[0]);
})


app.post('/addCars',async (req,res)=>{
    console.log("Recieved addCars");


    const newCar = new Car({
        name: req.body.name,
        quantity: Number(req.body.quantity)
    });


    cars.push(newCar);

    const resp = await addCar(newCar);

    res.status(201).json({ msg: resp });

})





app.post('/addQuantity',async (req,res)=>{

    console.log("Recieved addQuantity");

    const name = req.body.name;
    const quant = Number(req.body.quantity);

    const result = await updateCarByName(name,-quant);
    if(result == "Car quant added successfully")
        res.status(201).json({ msg: result });
    else
        res.status(501).json({ msg: result });

    /*for(let i = 0 ; i < cars.length;i++){
        if(cars[i].name === carName){
            
            cars[i].quantity = cars[i].quantity + quant;
            res.status(201).json({ msg: 'Car quantity increased successfully' });
        }
    }*/




})


app.post('/sellOneCar',async (req,res)=>{
    console.log("Recieved sellOneCar");
    //we will get name
    
    const name = req.body.name;
    const quant = Number(req.body.quantity);
    
    const result = await updateCarByName(name,quant);
    if(result == "Car sold successfully")
        res.status(201).json({ msg: result });
    else
        res.status(501).json({ msg: result });

}),




app.post('/deleteCars', async (req,res)=>{
    console.log("Recieved deleteCars");

    const nameOfTheCar = req.body.name;
    

    const resp = await deleteCarByName(nameOfTheCar);
    if(resp === "deleted Succesfully")    
        res.status(201).json({ msg: 'Car deleted successfully' });
    else   
        res.status(501).json({ msg: resp });

}),





app.listen(PORT, ()=>{
    console.log("Server has started at port",PORT,"you can Go to link from here "+`http://localhost:${PORT}`);
})
/*


app.get('/getRandomValueAlberto', (req,res) =>{
    
    const randomNumber =Math.floor (Math.random() * (100 - 20 + 1) + 20);
    res.send(randomNumber.toString())
    
}
);

app.get('/NuriRandomValue',(req,res)=>{
    console.log("got random value");
    let randValNuri = Math.round(Math.random()* (1000-1)+1)
    res.json(randValNuri);
})

app.get('/olaRandomValue', (req, res) => {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    res.json({ value: randomValue });
  });


  app.get('/emreRandomValue',(req,res)=>{
    console.log("Recieved emreRandomValue");

    const randomNumber = Math.floor(Math.random() * (22)) + 99;
    res.json(randomNumber);    
})



//==========================================================
app.get('/addRandomValueArshya',(req,res)=>{
    console.log("Add random value");

   const randomValue = Math.floor(Math.random() * (85 - 25 + 1)) + 25;
   res.json(randomValue);

    res.status(201).json({ msg: 'Random value created successfully' });

})
//============================================================
*/
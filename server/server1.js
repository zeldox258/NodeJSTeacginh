const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');


const uri ="mongodb://localhost:27017";
//1.1.1.127
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

async function getAllCars(){
    let result = [];
    try{
        const allCars = await carsCollection.find({});

        if(allCars.count() === 0){
            console.log("There is no record");
        }
        else{
            console.log("You have some records");
            await allCars.forEach((item)=>{ result.push(item); });
        }
    }
    catch(error){
        console.log(error);
    }
    
    return result;
}

async function getCarByName(name){
    let result;
    try{
        const allCars = await carsCollection.find({name:name});
        if(allCars.count() === 0){
            console.log("There is no record");
        }
        else{
            console.log("You have some records");
            await allCars.forEach((item)=>{ result = item; });
        }
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
                const result = await carsCollection.updateOne({name : name},{ $set: { quantity: carDetails.quantity } })
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
        const result = await carsCollection.deleteOne({name:carName});
    }
    catch(error){
        return error;
    }
    return "deleted Succesfully";

}

async function addCar(car){
    try{
        const result = await carsCollection.insertOne(car);
    }
    catch(error){
        return error;
    }
    return "Added Succesfully";
}



/*

 const source = [
        {
            _id :3,
            name:"Nuri"
        },
        {
            _id:4,
            name:"Arshya"
        }
    ];

    //const result = await students.insertMany(source);
    const allStudents = await students.find({});
    if(allStudents.count() === 0){
        console.log("There is no record");
    }
    else{
        console.log("You have some records");
        allStudents.forEach((item)=>{ console.log(item); });
    }

*/


startServer()
.then(()=>{
    console.log("Connection established");
}).catch((error)=>{
    console.log("ERROR",error);
})



const app = express();
const PORT = 3010;



app.use(express.json());
app.use(cors()); // Enable CORS for all routes





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


    const newCar = {
        name: req.body.name,
        quantity: Number(req.body.quantity)
    }

    cars.push(newCar);

    const resp = await addCar(newCar);

    res.status(201).json({ msg: resp });

})


/*

olaRandomValue => get endpoint return random number between 1 - 100
albertoRandomValue => get endpoint return random number between 20 - 100
arshyaRandomValue => get endpoint return random number between 25 - 85
emreRandomValue => get endpoint return random number between 99 - 120
nuriRandomValue => get endpoint return random number between 1 - 1000

*/




app.post('/addQuantity',(req,res)=>{

    console.log("Recieved addQuantity");

    const carName = req.body.name;
    const quant = Number(req.body.quantity);

    for(let i = 0 ; i < cars.length;i++){
        if(cars[i].name === carName){
            
            cars[i].quantity = cars[i].quantity + quant;
            res.status(201).json({ msg: 'Car quantity increased successfully' });
        }
    }

    res.status(501).json({ msg: 'there is no matched car' });
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
    
    /*for(let i = 0 ; i < cars.length;i++){
        if(cars[i].name === nameOfTheCar){
            
            cars.splice(i, 1);
            res.status(201).json({ msg: 'Car deleted successfully' });
        }
    }*/

    const resp = await deleteCarByName(nameOfTheCar);
    if(resp === "deleted Succesfully")    
        res.status(201).json({ msg: 'Car deleted successfully' });
    else   
        res.status(501).json({ msg: resp });

}),





app.listen(PORT, ()=>{
    console.log("Server has started at port",PORT,"you can Go to link from here "+`http://localhost:${PORT}`);
})



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

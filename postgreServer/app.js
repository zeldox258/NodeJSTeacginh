const { Client } = require('pg');
const express = require('express');
const cors = require('cors');



const app = express();
const PORT = 3010;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes


// Create a new client instance
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'FSINT6',
  password: 'Develhope12345.',
  port: 5432,
});


// Connect to the PostgreSQL server
client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }

  // Connected successfully
  console.log('Connected to PostgreSQL server');

  /*
  // Perform database operations
  client.query('insert into orders (orderID, productID, productCount) values (11,2 ,5),(12,5,8),(13,8,15);', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    // Process query results
    console.log('Query result:', result.rows);

  });

  */

      // Close the connection
    // client.end((err) => {
    //   if (err) {
    //     console.error('Error closing connection:', err);
    //   } else {
    //     console.log('Connection closed');
    //   }
    // });

});


app.listen(PORT, ()=>{
  console.log("Server has started at port",PORT,"you can Go to link from here "+`http://localhost:${PORT}`);
})


async function getAllCars() {
  try {
    const result = await client.query('SELECT * FROM cars');
    const resultArray = result.rows;

    //console.log('Query result:', resultArray);
    return resultArray;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err; // Rethrow the error to be handled by the caller
  }
}

async function addCar(carName, quantity) {
  try {
    let query = `insert into cars (carName , quantity) values ('${carName}',${quantity})`
    const result = await client.query(query);
    console.log(query);

    return true;
  } 
  
  catch (err) {
    console.error('Error executing query:', err);
    return false; // Rethrow the error to be handled by the caller
  }
}



async function deleteCar(carId) {
  try {
    let query = `delete from cars where carId = '${carId}'; `;
    const result = await client.query(query);
    console.log(query);
    //console.log(result);

    return result.rowCount > 0;
  } 
  
  catch (err) {
    console.error('Error executing query:', err);
    return false; // Rethrow the error to be handled by the caller
  }
}
async function incrementQuantity(carId, quantity) {
  try {

    let queryFirst = `select quantity from cars where carID = ${carId};`;
    const result1 = await client.query(queryFirst);
    if(result1.rows.length == 0) return false;

    console.log(result1);

    let query = `update cars set quantity = '${quantity + result1.rows[0].quantity}' where carID = ${carId}; `;
    //UPDATE cars
    //SET quantity = 10
    //WHERE carId = 5
    
    const result = await client.query(query);
    console.log(query);
    //console.log(result);

    return true;
  } 
  
  catch (err) {
    console.error('Error executing query:', err);
    return false; // Rethrow the error to be handled by the caller
  }
}


app.get('/getAllCars', async (req,res)=>{
  console.log("Recieved getAllCars");
  let result = await getAllCars();
  res.json(result);

})

app.post('/addCar', async (req,res)=>{
  console.log("Recieved addCar");
  let result = await addCar(req.body.carname , req.body.quantity);
  if(result){
    res.status(201).json({ msg: "Added succesfully" });
  }
  else{
    res.status(401).json({ msg: "Can not add car" });
  }
  
});


app.post('/deleteCar', async (req,res)=>{
  console.log("Recieved deleteCar");
  let result = await deleteCar(req.body.carId);
  if(result){
    res.status(201).json({ msg: "Delete succesfully" });
  }
  else{
    res.status(401).json({ msg: "Can not delete car" });
  }
  
});



app.post('/incrementQuantity', async (req,res)=>{
  console.log("Recieved incrementQuantity");
  let result = await incrementQuantity(req.body.carId, req.body.quantity);
  if(result){
    res.status(201).json({ msg: "Incremented successfully" });
  }
  else{
    res.status(401).json({ msg: "Can not increment car" });
  }
  
});



app.post('/decreaseQuantity', async (req,res)=>{
  console.log("Recieved decreaseQuantity");
  let result = await incrementQuantity(req.body.carId, -req.body.quantity);
  if(result){
    res.status(201).json({ msg: "Decreased successfully" });
  }
  else{
    res.status(401).json({ msg: "Can not decrease car" });
  }
  
});


/*


function getAllProducts(){//Arshya and Sildi mission.
  let results;
  // Perform database operations
  client.query('SELECT * FROM student', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    // Process query results
    console.log('Query result:', result.rows);

    results = result.rows;
  });

  return results;
}





app.get('/getAllProducs',async (req,res)=>{//Ola Endpoint
    console.log("Recieved getAllProducs");
    let result = await getAllProducts();
    res.json(result);

});


async function getAllProducs(){//Aisha
        console.log("You are about to send a request");

        await axios.get('http://localhost:3010/getAllProducs',{})
        .then(response => {
            // Handle successful response
            console.log(response.data);
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });




    }


*/


//FirstPlan
//login userNAme and password as a result we willl get userID
//register userNAme and password as a result we willl get userID

//SecondPlan
//getItemByID => item


//Third plan
//addBasket    id and quantity userID
//deleteFromBasket id and quantity userID
//getBasket userID

//Basket Table => productID quantity userID
//user table => userID userName password
//product Table => productID price ...

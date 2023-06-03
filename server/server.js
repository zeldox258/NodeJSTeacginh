const https = require('https');
const PORT = 3010;


const server = https.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html');//application/json
    res.statusCode = 200;

    const responseMessage = '<h1>HELLO OUR FIRST SERVER</h1>';    


    res.end(responseMessage);

});


server.listen(PORT, ()=>{
    console.log("Server has started at port",PORT,"you can Go to link from here "+`https://localhost:${PORT}`);
})

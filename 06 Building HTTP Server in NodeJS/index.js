// including module called http
const http = require("http")

// creating server
// and 
// handler to handle particular request (here handler is callback)
const server = http.createServer((req, res) => {
    // req will contain all the data of client 
    console.log("New Request receive");


    // res will contain response of that particular request like below
    res.end("Hello From Server")
})

// Now to run this server we need a port

server.listen(8000, () => {
    // if everything goes well we will get the below output
    console.log("Server is started at port http://localhost:8000");
})

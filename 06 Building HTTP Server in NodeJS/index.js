// including module called http
const { error } = require("console");
const fs = require("fs");
const http = require("http")



// creating server
// and 
// handler to handle particular request (here handler is callback)
const server = http.createServer((req, res) => {
    // req will contain all the data of client 

    // below we are logging all the request we are getting 
    const myData = `${Date.now()}: New Request Received from ${req.url}\n`
    fs.appendFile("log.txt", myData, (error, data) => {
        // res.end("Hello From Server Again")
        // now we are sending res according to endpoint 

        switch (req.url) {
            case '/':
                res.end("Hello From Home")
                break;
            case '/about':
                res.end("Hello From about")
                break;
            case '/contact':
                res.end("Hello From contact")
                break;

            default:
                break;
        }
    })


    // res will contain response of that particular request like below
    // res.end("Hello From Server")
})

// Now to run this server we need a port

server.listen(8000, () => {
    // if everything goes well we will get the below output
    console.log("Server is started at port http://localhost:8000");
})

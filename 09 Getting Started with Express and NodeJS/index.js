const express = require('express');
// const http = require('http');
const app = express()

app.get('/', (req, res) => {
    res.send("Hello Home Page!")
})
app.get('/about', (req, res) => {
    // url is http://localhost:8000/about?name=Jay&userId=1
    res.send(`Hello ${req.query.name}!`)
})


app.listen(8000, () => {
    console.log("Server is connected http://localhost:8000");
})

// below code is also handle by express both are same
// const server = http.createServer(app)

// server.listen(8000, () => {
//     console.log("Server is connected http://localhost:8000");
// })


// here express handling the url so we don't need to install any extra package to handle url
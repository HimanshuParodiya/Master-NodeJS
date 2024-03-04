const express = require('express');
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;


app.get("/", (req, res) => {
    return res.send("Go to /users")
})
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => (
        `<li>${user.first_name}</li>`
    )).join("")}
    </ul>
    `
    return res.send(html)
})

// REST API 
// get all users
app.get("/api/users", (req, res) => {
    return res.json(users)
})

// get each users
app.get("/api/users/:id", (req, res) => {
    const id = +req.params.id;
    const userWithId = users.find((user) => (
        user.id == id
    ))
    return res.json(userWithId)
})


// by default browser will do get request

// Post requests

app.post('/api/users', (req, res) => {
    // TODO: create new user 

    return res.json({ status: "Pending" })
})

// Patch requests

app.patch('/api/users/:id', (req, res) => {
    // TODO: edit the user with id 

    return res.json({ status: "Pending" })
})

// Delete requests

app.delete('/api/users/:id', (req, res) => {
    // TODO: Delete the user with id 

    return res.json({ status: "Pending" })
})

// now we can see the path of get, put and delete is same 
//- so we can make their group

// like 

app.route("/api/users/:id").get((req, res) => {
    const id = +req.params.id;
    const userWithId = users.find((user) => (
        user.id == id
    ))
    return res.json(userWithId)
}).patch((req, res) => {
    // TODO: edit the user with id 

    return res.json({ status: "Pending" })
}).delete((req, res) => {
    // TODO: edit the user with id 

    return res.json({ status: "Pending" })
})




app.listen(PORT, () => {
    console.log(`Server started at PORT: http://localhost:${PORT}`);
})





// now we have worked with get method

// in next we will work with POSTMAN to work with PATCH POST AND DELETE Method
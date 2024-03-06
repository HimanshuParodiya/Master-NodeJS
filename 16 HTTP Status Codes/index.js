const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;


app.use(express.urlencoded({ extended: false })) // middleware (this will handle put the form data in the body)

//creating custom middleware 
app.use((req, res, next) => { // next is the reference to next middleware in the stack
    // when there is 1 middleware so next is pointing to our routes when 

    console.log("Hello from middleware 1");

    // return res.json({ msg: "Hello from middleware 1" }) // now in postmen instead of users we are getting this object because we are returning it req didn't even reach to our routes

    // so what we can do is call the next
    next()

})


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
    res.setHeader("myHeaderName", "This is header value")
    return res.json(users)
})

// get each users
app.get("/api/users/:id", (req, res) => {
    const id = +req.params.id;
    const userWithId = users.find((user) => (
        user.id == id
    ))
    if (!userWithId) {
        return res.status(404).json({ msg: "User not found" })
    }
    return res.json(userWithId)
})


// by default browser will do get request

// Post requests

app.post('/api/users', (req, res) => {
    // TODO: create new user 
    const body = req.body // all data sent from frontend
    if (!body || !body.last_name || !body.first_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ mag: "All fields are required" }) // return this message with status code 400
    }
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, result) => {
        return res.json({ status: "Success", id: users.length })
    })
})

// Patch requests

app.patch('/api/users/:id', (req, res) => {
    // TODO: edit the user with id 

    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id)
    const updatedUser = { ...user, ...body };
    updatedUser.id = id;
    users[id - 1] = updatedUser

    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", updatedUser })
    })

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
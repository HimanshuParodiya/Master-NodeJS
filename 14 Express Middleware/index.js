const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;


app.use(express.urlencoded({ extended: false })) // middleware (this will handle put the form data in the body)

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
    const body = req.body // all data sent from frontend
    //- console.log(body); // right now undefined because express don't know that what type of data is that and how to handle it 
    // so for that we have to use middleware (for think it as a plugin)

    //- after adding middleware
    // console.log(body);
    //{ first_name: 'Jay', last_name: 'Tyagi', email: 'Jay@tyagi.com', gender: 'Male', job_title: 'SDE-20'  } 
    // we are getting our form data entered in postman 


    //- adding the new user in users 
    // here we don't have database so we are working with fs
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
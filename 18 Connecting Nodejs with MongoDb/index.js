const express = require('express');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const app = express();
const PORT = 8000;


// Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/database-name")
    .then(() => console.log("MongoDB  Connected"))
    .catch((err) => console.log("There is an error", err))
// Create Schema for users

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,

    },
    gender: {
        type: String,
    },
},
    { timestamps: true }
)


// Create Model for our users schema
const User = mongoose.model("user", userSchema)

// now we can interact with mongo using this User 

// till here we have got database-name database and collection of name users


























app.use(express.urlencoded({ extended: false })) // middleware (this will handle put the form data in the body)

//creating custom middleware 
app.use((req, res, next) => { // next is the reference to next middleware in the stack
    console.log("Hello from middleware 1");
    next()

})


app.get("/", (req, res) => {
    return res.send("Go to /users")
})
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map((user) => (
        `<li>${user.firstName} - ${user.jobTitle}</li>`
    )).join("")}
    </ul>
    `
    return res.send(html)
})

// REST API 
// get all users
app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({})
    // res.setHeader("myHeaderName", "This is header value")
    return res.json(allDbUsers)
})

// get each users
app.get("/api/users/:id", async (req, res) => {
    const userWithId = await User.findById(req.params.id);
    if (!userWithId) {
        return res.status(404).json({ msg: "User not found" })
    }
    return res.json(userWithId)
})


// by default browser will do get request

// Post requests

app.post('/api/users', async (req, res) => {
    // TODO: create new user 
    const body = req.body // all data sent from frontend
    if (!body || !body.last_name || !body.first_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ mag: "All fields are required" }) // return this message with status code 400
    }

    // creating and return user using User (initialized using mongoose.model) 
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })

    // console.log(result);
    return res.status(201).json({ msg: "Success" })
})

// Patch requests

app.patch('/api/users/:id', async (req, res) => {
    // TODO: edit the user with id 
    await User.findByIdAndUpdate(req.params.id, { lastName: "Update Last Name" })
    return res.json({ status: "Success" })

})

// Delete requests

app.delete('/api/users/:id', async (req, res) => {
    // TODO: Delete the user with id 
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" })
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




// next time we gonna refactor the code
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

app.listen(PORT, () => {
    console.log(`Server started at PORT: http://localhost:${PORT}`);
})
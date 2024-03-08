const express = require('express');
const { connectMongoDb } = require('./db');
const { logReqRes } = require('./middlewares');
const userRouter = require("./routes/user")


const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/database-name");
app.use(express.urlencoded({ extended: false })) // middleware (this will handle put the form data in the body)
app.use(logReqRes("log.txt"))

// Routes

app.use('/user', userRouter) // any request start with /user will go to userRouter file
// so now in router/user.js / become /user


app.listen(PORT, () => {
    console.log(`Server started at PORT: http://localhost:${PORT}`);
})
const express = require('express');
const { connectToMongoDB } = require('./connect');
//models
const URL = require('./models/url');
const path = require('path');
// routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');


const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() =>
    console.log("MongoDB Connected")
)


// middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

// redirecting user to original url
app.get("/url/:shortID", async (req, res) => {
    const shortID = req.params.shortID
    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    })

    res.redirect(entry.redirectedURL)
})

app.use("/url", urlRoute)
// rendering static page
app.use('/', staticRoute)

// any path stating with /user gonna use userRoute
app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`Server started at port : http://localhost:${PORT}`);
})
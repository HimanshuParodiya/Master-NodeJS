const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener")
    .then(
        console.log("MongoDB Connected")
    )


// middleware 
app.use(express.json())


// redirecting user to original url
app.get("/:shortID", async (req, res) => {
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
app.listen(PORT, () => {
    console.log(`Server started at port : http://localhost:${PORT}`);
})
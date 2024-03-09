const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const path = require('path');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener")
    .then(
        console.log("MongoDB Connected")
    )


// middleware 
app.use(express.json())


// below method is very hectic
// app.get("/test", async (req, res) => {
//     const allURLs = await URL.find({});

//     return res.end(`

//     <html>
//     <head></head>
//     <body>

//     <ul>
//     ${allURLs.map((url) => `<li>${url.shortID} - ${url.redirectedURL}</li>`).join("")}

//     </ul>
//     </body>
//     </html>

//     `)
// })

// instead we gonna use EJS 

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

app.get("/test", async (req, res) => {
    const allURLs = await URL.find({});

    return res.render("home", {
        urls: allURLs // now we can access urls in home.ejs
    })
})


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
app.listen(PORT, () => {
    console.log(`Server started at port : http://localhost:${PORT}`);
})
const shortid = require('shortid');
const URL = require('../models/url');

async function handelGenerateNewShortURL(req, res) {
    const body = req.body;
    console.log(body);
    if (!body.url) return res.status(400).json({ error: "URL is required" })
    const shortID = shortid() // it will generate a random string  
    await URL.create({
        shortID: shortID,
        redirectedURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID })
}


// controlling visits on site
async function handelGetAnalytics(req, res) {
    const shortID = req.params.shortID

    const result = await URL.findOne({ shortID })
    console.log(result);

    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })

}


module.exports = {
    handelGenerateNewShortURL,
    handelGetAnalytics
}
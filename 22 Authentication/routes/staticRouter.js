const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    // if there is no user in req then redirect to login page
    if (!req.user) {
        return res.redirect('/login')
    }

    // else find the urls of particular 
    // const allUrls = await URL.find({})
    const allUrls = await URL.find({ createdBy: req.user._id })

    return res.render("home", {
        urls: allUrls
    })
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.get("/login", (req, res) => {
    return res.render("login")
})

module.exports = router

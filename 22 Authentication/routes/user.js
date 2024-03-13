const express = require('express');
const { handleUserSignup } = require('../controllers/user');


const router = express.Router()


// signup router

router.post("/", handleUserSignup);
// router.post("/", handleSignup);


module.exports = router
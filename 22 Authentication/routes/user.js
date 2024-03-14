const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/user');


const router = express.Router()


// signup router

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);


module.exports = router
const express = require('express');
const { handelGenerateNewShortURL } = require('../controllers/url');
const router = express.Router()

router.post('/', handelGenerateNewShortURL)

module.exports = router
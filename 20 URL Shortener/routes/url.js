const express = require('express');
const { handelGenerateNewShortURL, handelGetAnalytics } = require('../controllers/url');
const router = express.Router()

router.post('/', handelGenerateNewShortURL)
router.get('/analytics/:shortId', handelGetAnalytics)

module.exports = router
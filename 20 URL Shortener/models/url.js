const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectedURL: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: { type: Number }
    }],
}, { timestamps: true })

const URL = mongoose.model("url", urlSchema)
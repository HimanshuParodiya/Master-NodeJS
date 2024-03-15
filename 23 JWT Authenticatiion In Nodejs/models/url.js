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
    createdBy: {
        // in here we are giving id and that id is referring to user 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
}, { timestamps: true })

const URL = mongoose.model("url", urlSchema) // in mongo db we will get collection of name url

module.exports = URL
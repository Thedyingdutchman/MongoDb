const mongoose = require("mongoose")

const infoSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true, 
        unique: true,
    },
    Budget: {
        type: Number,
        required: true,
    },
    Color: {
        type: String,
        min: 6,
        required: true,
    }
}, { collection: 'info'})

module.exports = mongoose.model('info', infoSchema)
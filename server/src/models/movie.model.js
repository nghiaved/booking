const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: String,
    time: Number,
    date: String,
    image: String,
})

module.exports = mongoose.model('movie', movieSchema)
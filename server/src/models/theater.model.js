const mongoose = require('mongoose')

const Schema = mongoose.Schema

const theaterSchema = new Schema({
    name: String,
    image: String,
})

module.exports = mongoose.model('theater', theaterSchema)
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const showtimeSchema = new Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "theater" },
    date: String,
    time: String,
    number: Number,
    quantity: Number,
    remaining: Number,
})

module.exports = mongoose.model('showtime', showtimeSchema)
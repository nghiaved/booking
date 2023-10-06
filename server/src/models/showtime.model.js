const mongoose = require('mongoose')

const Schema = mongoose.Schema

const showtimeSchema = new Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "theater" },
    datetime: String,
    number: Number,
})

module.exports = mongoose.model('showtime', showtimeSchema)
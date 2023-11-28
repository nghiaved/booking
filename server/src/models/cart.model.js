const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "theater" },
    date: String,
    time: String,
    number: Number,
    quantity: Number,
    remaining: Number,
})

module.exports = mongoose.model('cart', cartSchema)
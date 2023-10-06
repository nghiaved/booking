const movieModel = require('../models/movie.model')

const movieController = {
    handleCreate: async (req, res, next) => {
        movieModel.create(req.body)
            .then(movie => res.json({ movie }))
            .catch(next)
    },

    handleRead: async (req, res, next) => {
        movieModel.find()
            .then(movies => res.json({ movies }))
            .catch(next)
    },

    handleUpdate: async (req, res, next) => {
        movieModel.updateOne({ _id: req.params.id }, req.body)
            .then(movie => res.json({ movie }))
            .catch(next)
    },

    handleDelete: async (req, res, next) => {
        movieModel.deleteOne({ _id: req.params.id })
            .then(movie => res.json({ movie }))
            .catch(next)
    },
}

module.exports = movieController
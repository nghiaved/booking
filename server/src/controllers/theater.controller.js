const theaterModel = require('../models/theater.model')

const theaterController = {
    handleCreate: async (req, res, next) => {
        theaterModel.create(req.body)
            .then(theater => res.json({ theater }))
            .catch(next)
    },

    handleRead: async (req, res, next) => {
        theaterModel.find()
            .then(theaters => res.json({ theaters }))
            .catch(next)
    },

    handleUpdate: async (req, res, next) => {
        theaterModel.updateOne({ _id: req.params.id }, req.body)
            .then(theater => res.json({ theater }))
            .catch(next)
    },

    handleDelete: async (req, res, next) => {
        theaterModel.deleteOne({ _id: req.params.id })
            .then(theater => res.json({ theater }))
            .catch(next)
    },
}

module.exports = theaterController
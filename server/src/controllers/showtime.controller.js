const showtimeModel = require('../models/showtime.model')

const showtimeController = {
    handleCreate: async (req, res, next) => {
        await showtimeModel.create(req.body)
            .then(async result => {
                await showtimeModel.findOne({ _id: result._id })
                    .populate("movie", '-image')
                    .populate("theater", '-image')
                    .then(showtime => res.json({ showtime }))
                    .catch(next)
            })
    },

    handleRead: async (req, res, next) => {
        showtimeModel.find()
            .populate("movie", '-image')
            .populate("theater", '-image')
            .then(showtimes => res.json({ showtimes }))
            .catch(next)
    },

    handleUpdate: async (req, res, next) => {
        showtimeModel.updateOne({ _id: req.params.id }, req.body)
            .then(showtime => res.json({ showtime }))
            .catch(next)
    },

    handleDelete: async (req, res, next) => {
        showtimeModel.deleteOne({ _id: req.params.id })
            .then(showtime => res.json({ showtime }))
            .catch(next)
    },
}

module.exports = showtimeController
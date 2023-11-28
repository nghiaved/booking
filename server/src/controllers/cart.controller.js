const cartModel = require('../models/cart.model')

const cartController = {
    handleCreate: async (req, res, next) => {
        await cartModel.create(req.body)
            .then(async result => {
                await cartModel.findOne({ _id: result._id })
                    .populate("user", '-password')
                    .populate("movie", '-image')
                    .populate("theater", '-image')
                    .then(cart => res.json({ cart }))
                    .catch(next)
            })
    },

    handleRead: async (req, res, next) => {
        cartModel.find({ user: req.query.user })
            .populate("user", '-password')
            .populate("movie", '-image')
            .populate("theater", '-image')
            .then(carts => res.json({ carts }))
            .catch(next)
    },

    handleUpdate: async (req, res, next) => {
        cartModel.updateOne({ _id: req.params.id }, req.body)
            .then(cart => res.json({ cart }))
            .catch(next)
    },

    handleDelete: async (req, res, next) => {
        cartModel.deleteOne({ _id: req.params.id })
            .then(cart => res.json({ cart }))
            .catch(next)
    }
}

module.exports = cartController
const express = require('express')

const cartController = require('../controllers/cart.controller')

const router = express.Router()

const showtimeRoute = app => {
    router.post('/create', cartController.handleCreate)
    router.get('/read', cartController.handleRead)
    router.put('/update/:id', cartController.handleUpdate)
    router.delete('/delete/:id', cartController.handleDelete)

    return app.use('/api/cart', router)
}

module.exports = showtimeRoute
const express = require('express')

const theaterController = require('../controllers/theater.controller')

const router = express.Router()

const theaterRoute = app => {
    router.post('/create', theaterController.handleCreate)
    router.get('/read', theaterController.handleRead)
    router.put('/update/:id', theaterController.handleUpdate)
    router.delete('/delete/:id', theaterController.handleDelete)

    return app.use('/api/theater', router)
}

module.exports = theaterRoute
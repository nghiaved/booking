const express = require('express')

const movieController = require('../controllers/movie.controller')

const router = express.Router()

const movieRoute = app => {
    router.post('/create', movieController.handleCreate)
    router.get('/read', movieController.handleRead)
    router.put('/update/:id', movieController.handleUpdate)
    router.delete('/delete/:id', movieController.handleDelete)

    return app.use('/api/movie', router)
}

module.exports = movieRoute
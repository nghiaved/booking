const express = require('express')

const showtimeController = require('../controllers/showtime.controller')

const router = express.Router()

const showtimeRoute = app => {
    router.post('/create', showtimeController.handleCreate)
    router.get('/read', showtimeController.handleRead)
    router.put('/update/:id', showtimeController.handleUpdate)
    router.delete('/delete/:id', showtimeController.handleDelete)
    router.get('/search/movie', showtimeController.handleSearchMovie)
    router.get('/search/theater', showtimeController.handleSearchTheater)

    return app.use('/api/showtime', router)
}

module.exports = showtimeRoute
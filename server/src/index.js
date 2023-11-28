//Import thư viện
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

//Run appp
const app = express()

//Kết nối tới mongodb
try {
    mongoose.connect('mongodb://localhost:27017/booking', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Connect successfully!')
} catch (error) {
    console.log('Connect failure!')
}

//Cho phép nhận dữ liệu để xử lý từ form
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}))

//Cho phép client gửi yêu cầu tới server
app.use(cors())

//Các tuyến đường
require('./routes/user.route')(app)
require('./routes/movie.route')(app)
require('./routes/theater.route')(app)
require('./routes/showtime.route')(app)
require('./routes/cart.route')(app)

//Mở cổng lắng nghe
app.listen(8080, () => {
    console.log(`Server's listening at http://localhost:8080`);
})
const userModel = require('../models/user.model')

const userController = {
    handleRegister: async (req, res, next) => {
        //Dữ liệu từ form
        const createUser = new userModel(req.body)
        await createUser.save()
            .then(() => {
                //Phản hồi tạo tài khoản thành công
                res.status(200).json({ status: true, success: 'User Registered Successfully' })
            })
            .catch(next)
    },

    handleLogin: async (req, res, next) => {
        const { username, password } = req.body
        //Tìm tên tài khoản trong database
        await userModel.findOne({ username })
            .then(async (user) => {
                if (!user) {
                    //Không có không tồn tại
                    res.status(400).json({ status: false, message: `User don't exist` })
                }

                //So sanh mật khẩu
                if (password !== user.password) {
                    //Sai mật khẩu
                    res.status(400).json({ status: false, message: `Password invalid` })
                }

                //Gửi thông tin đăng nhập
                const userInfo = user.toObject()
                delete userInfo.password

                //Đăng nhập thành công
                res.status(200).json({ status: true, userInfo })
            })
            .catch(next)
    },
}

module.exports = userController
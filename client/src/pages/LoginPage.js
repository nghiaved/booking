import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { apiUserLogin } from '../services'

export default function LoginPage() {
    const { register, handleSubmit } = useForm()
    const [errMessage, setErrMessage] = useState()

    //Hàm xử lý đăng nhập
    const onSubmit = async data => {
        console.log(data);
        try {
            //Nhận dữ liệu từ form đăng nhập sau đó gọi API tới server
            const res = await apiUserLogin(data)
            if (res && res.status === true) {
                //Nếu thành công lưu lại thông tin đăng nhập
                localStorage.setItem('isLoggedIn', res.status)
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                //Trở về trang chủ
                window.location.href = '/'
            }
        } catch (e) {
            //Nếu thất bại thông báo lỗi
            setErrMessage(e.message)
        }
    }

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="title">
                        Đăng nhập
                    </div>
                    <input required placeholder="Username" autoComplete="off" {...register('username', { required: true })} />
                    <input type='password' required placeholder="Password" autoComplete="off" {...register('password', { required: true })} />
                    <button>
                        Đăng nhập
                    </button>
                    <span>
                        {errMessage}
                    </span>
                    <p>
                        Tạo tài khoản?
                        <Link to='/register'> Đăng ký</Link>
                        <Link to='/'>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </p>
                </form>
            </div>
        </div >
    )
}

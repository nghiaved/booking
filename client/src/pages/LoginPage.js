import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { apiUserLogin } from '../services'

export default function LoginPage() {
    const { register, handleSubmit } = useForm()
    const [errMessage, setErrMessage] = useState()

    const onSubmit = async data => {
        try {
            const res = await apiUserLogin(data)
            if (res && res.status === true) {
                localStorage.setItem('isLoggedIn', res.status)
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                window.location.href = '/'
            }
        } catch (e) {
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
                    <input required placeholder="Password" autoComplete="off" {...register('password', { required: true })} />
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
                            <i class="fa-solid fa-house"></i>
                        </Link>
                    </p>
                </form>
            </div>
        </div >
    )
}

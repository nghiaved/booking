import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { apiUserRegister } from '../services'

export default function RegisterPage() {
    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()


    const onSubmit = async data => {
        try {
            const res = await apiUserRegister(data)
            if (res && res.status === true) {
                setMessage(res.success)
            }
        } catch (e) {
            setMessage(e.message)
        }
    }

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="title">
                        Đăng ký
                    </div>
                    <input required placeholder="Username" autoComplete="off" {...register('username', { required: true })} />
                    <input required placeholder="Password" autoComplete="off" {...register('password', { required: true })} />
                    <button>
                        Đăng ký
                    </button>
                    <span className='success'>
                        {message}
                    </span>
                    <p>
                        Đã có tài khoản?
                        <Link to='/login'> Đăng nhập</Link>
                        <Link to='/'>
                            <i class="fa-solid fa-house"></i>
                        </Link>
                    </p>
                </form>
            </div>
        </div >
    )
}

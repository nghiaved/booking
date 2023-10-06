import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiShowtimeUpdate } from '../../../services'

export default function Update() {
    const location = useLocation()
    const showtime = location.state

    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()

    const navigate = useNavigate()

    const onSubmit = async (data, e) => {
        data._id = showtime._id
        try {
            const res = await apiShowtimeUpdate(data)
            if (res.showtime) {
                navigate('/admin/showtime')
            }
            e.target.reset()
        } catch (e) {
            setMessage('Failure')
        }
    }

    return (
        <div className='create'>
            <Link to='/admin/showtime'>Read</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Update</h2>
                <input defaultValue={showtime.movie._id} required autoComplete="off" {...register('movie', { required: true })} placeholder='Movie' />
                <input defaultValue={showtime.theater._id} required autoComplete="off" {...register('theater', { required: true })} placeholder='Theater' />
                <input defaultValue={showtime.datetime} required autoComplete="off" {...register('datetime', { required: true })} placeholder='Datetime' />
                <input defaultValue={showtime.number} required autoComplete="off" {...register('number', { required: true })} placeholder='Number' />
                <p>{message && message} </p>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

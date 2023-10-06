import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiShowtimeCreate } from '../../../services'

export default function Create() {
    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()

    const onSubmit = async (data, e) => {
        try {
            const res = await apiShowtimeCreate(data)
            if (res.showtime) {
                setMessage('Success')
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
                <h2>Create</h2>
                <input required autoComplete="off" {...register('movie', { required: true })} placeholder='Movie' />
                <input required autoComplete="off" {...register('theater', { required: true })} placeholder='Theater' />
                <input required autoComplete="off" {...register('datetime', { required: true })} placeholder='Datetime' />
                <input required autoComplete="off" {...register('number', { required: true })} placeholder='Number' />
                <p>{message && message} </p>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

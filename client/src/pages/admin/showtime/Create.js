import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiMovieRead, apiTheaterRead, apiShowtimeCreate } from '../../../services'

export default function Create() {
    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()
    const [movies, setMovies] = useState([])
    const [theaters, setTheaters] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const resMovie = await apiMovieRead()
        const resTheater = await apiTheaterRead()
        setMovies(resMovie.movies)
        setTheaters(resTheater.theaters)
    }

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
                <select {...register('movie', { required: true })}>
                    {movies.map(item => <option key={item._id} value={item._id}>{item.title}</option>)}
                </select>
                <select {...register('theater', { required: true })}>
                    {theaters.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
                </select>
                <input required autoComplete="off" {...register('date', { required: true })} placeholder='Date' />
                <input required autoComplete="off" {...register('time', { required: true })} placeholder='Time' />
                <input required autoComplete="off" {...register('number', { required: true })} placeholder='Number' />
                <p>{message && message} </p>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

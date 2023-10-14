import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiMovieRead, apiTheaterRead, apiShowtimeUpdate } from '../../../services'

export default function Update() {
    const location = useLocation()
    const showtime = location.state

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
                <select {...register('movie', { required: true })}>
                    {movies.map(item =>
                        item._id === showtime.movie._id
                            ? <option defaultChecked key={item._id} value={item._id}>{item.title}</option>
                            : <option key={item._id} value={item._id}>{item.title}</option>
                    )}
                </select>
                <select {...register('theater', { required: true })}>
                    {theaters.map(item =>
                        item._id === showtime.theater._id
                            ? <option defaultChecked key={item._id} value={item._id}>{item.name}</option>
                            : <option key={item._id} value={item._id}>{item.name}</option>
                    )}
                </select>
                <input defaultValue={showtime.date} required autoComplete="off" {...register('date', { required: true })} placeholder='Date' />
                <input defaultValue={showtime.time} required autoComplete="off" {...register('time', { required: true })} placeholder='Time' />
                <input defaultValue={showtime.number} required autoComplete="off" {...register('number', { required: true })} placeholder='Number' />
                <p>{message && message} </p>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

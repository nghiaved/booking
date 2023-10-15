import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiMovieRead, apiShowtimeRead, apiTheaterRead, apiShowtimeDelete, apiMovieDelete, apiTheaterDelete } from '../../services'

export default function Home() {
    const [showtimes, setShowtimes] = useState([])
    const [movies, setMovies] = useState([])
    const [theaters, setTheaters] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const resShowtime = await apiShowtimeRead()
        const resMovie = await apiMovieRead()
        const resTheater = await apiTheaterRead()
        setShowtimes(resShowtime.showtimes)
        setMovies(resMovie.movies)
        setTheaters(resTheater.theaters)
    }

    const deleteShowtime = async id => {
        if (window.confirm("Delete")) {
            await apiShowtimeDelete(id)
            fetchData()
        }
    }

    const deleteMovie = async id => {
        if (window.confirm("Delete")) {
            await apiMovieDelete(id)
            fetchData()
        }
    }

    const deleteTheater = async id => {
        if (window.confirm("Delete")) {
            await apiTheaterDelete(id)
            fetchData()
        }
    }

    return (
        <div className='read'>
            <h1>Showtime</h1>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Number</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {showtimes.length > 0 ? showtimes.map((item, index) =>
                        <tr key={item._id}>
                            <td>{++index}</td>
                            <td>{item.movie && item.movie.title}</td>
                            <td>{item.theater && item.theater.name}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.number}</td>
                            <td>
                                <Link to='/admin/showtime/update' state={item}>
                                    <i className="fa-solid fa-pen btn-edit"></i>
                                </Link>
                            </td>
                            <td>
                                <i onClick={() => deleteShowtime(item._id)} className="fa-solid fa-trash btn-delete"></i>
                            </td>
                        </tr>
                    ) :
                        <tr>
                            <td colSpan='8'>Không có dữ liệu</td>
                        </tr>
                    }
                </tbody>
            </table>
            <h1>Movies</h1>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length > 0 ? movies.map((item, index) =>
                        <tr key={item._id}>
                            <td>{++index}</td>
                            <td>{item.title}</td>
                            <td>{item.time}</td>
                            <td>{item.date}</td>
                            <td>
                                <img src={item.image} alt='' />
                            </td>
                            <td>
                                <Link to='/admin/movie/update' state={item}>
                                    <i className="fa-solid fa-pen btn-edit"></i>
                                </Link>
                            </td>
                            <td>
                                <i onClick={() => deleteMovie(item._id)} className="fa-solid fa-trash btn-delete"></i>
                            </td>
                        </tr>
                    ) :
                        <tr>
                            <td colSpan='6'>Không có dữ liệu</td>
                        </tr>
                    }
                </tbody>
            </table>
            <h1>Theaters</h1>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {theaters.length > 0 ? theaters.map((item, index) =>
                        <tr key={item._id}>
                            <td>{++index}</td>
                            <td>{item.name}</td>
                            <td>
                                <img src={item.image} alt='' />
                            </td>
                            <td>
                                <Link to='/admin/theater/update' state={item}>
                                    <i className="fa-solid fa-pen btn-edit"></i>
                                </Link>
                            </td>
                            <td>
                                <i onClick={() => deleteTheater(item._id)} className="fa-solid fa-trash btn-delete"></i>
                            </td>
                        </tr>
                    ) :
                        <tr>
                            <td colSpan='6'>Không có dữ liệu</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

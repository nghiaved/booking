import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiMovieRead, apiMovieDelete } from '../../../services'

export default function Read() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMovieRead()
        setMovies(res.movies)
    }

    const deleteMovie = async id => {
        if (window.confirm("Delete")) {
            await apiMovieDelete(id)
            fetchData()
        }
    }

    return (
        <div className='read'>
            <Link to='/admin/movie/create'>Create</Link>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>Time</th>
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
        </div>
    )
}

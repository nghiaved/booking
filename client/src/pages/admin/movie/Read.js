import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiMovieRead, apiMovieDelete } from '../../../services'

export default function Read() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await apiMovieRead()
        setMovies(data.movies)
    }

    const deleteMovie = async id => {
        // Xác nhận xoá
        if (window.confirm("Bạn có chắc chắn muốn vĩnh viễn")) {
            // Xử lý xoá phim
            await apiMovieDelete(id)
            // Gọi lại lấy danh sách phim sau khi xoá
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
                        <th>Date</th>
                        <th>Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length > 0 ? movies.map((item, index) =>
                        // for(i; i < movies.length; i++) {
                        //     movies[i] = item
                        // }
                        <tr key={item._id}>
                            <td>{++index}</td>
                            <td>{item.title}</td>
                            <td>{item.time}</td>
                            <td>{item.date}</td>
                            <td>
                                <img src={item.image} alt='' />
                            </td>
                            <td>
                                {/* the Link = thẻ a */}
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
                            <td colSpan='7'>Không có dữ liệu</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

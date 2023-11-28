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
        <div className="movies-wrapper">
            {movies && movies.map(item =>
                <div key={item._id} className="item-wrapper">
                    <div className="item">
                        <div className="img">
                            <img src={item.image} alt="" />
                            <div className="coating">
                                <div className="feature">
                                    <Link to='/admin/movie/update' state={item}>
                                        Sửa
                                    </Link>
                                </div>
                                <div onClick={() => deleteMovie(item._id)} className="feature">
                                    Xoá
                                </div>
                                <div className="feature">
                                    <Link to={`/admin/movie/${item._id}`} state={item._id}>Xem thêm</Link>
                                </div>
                            </div>
                        </div>
                        <div className="title">{item.title}</div>
                        <div className="desc">
                            <span>{item.time}Phút</span> | <span>{item.date}</span>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

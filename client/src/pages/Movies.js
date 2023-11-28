import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiMovieRead } from '../services'

function Movies({ isHome }) {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        //Lấy ra tất cả phim
        const res = await apiMovieRead()
        //Nếu nằm ở trang chủ thì hiện 4 phim
        setMovies(isHome ? res.movies.slice(0, 4) : res.movies)
    }

    return (
        <div>
            <span className='span-loc-phim'>Lọc phim:</span>
            <input className='input-loc-phim' onChange={e => setSearch(e.target.value)} placeholder='Tìm tên phim' />
            <div className="movies-wrapper">
                {movies && movies.filter(item => {
                    return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search.toLowerCase())
                }).map(item =>
                    <div key={item._id} className="item-wrapper">
                        <div className="item">
                            <div className="img">
                                <img src={item.image} alt="" />
                                <div className="coating">
                                    <div className="feature">
                                        <Link to={`/movie/${item._id}`} state={item._id}>Xem thêm</Link>
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
        </div>
    );
}

export default Movies;
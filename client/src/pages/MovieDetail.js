import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiShowtimeSearchMovies } from '../services'

function MovieDetail() {
    const [showtimes, setShowtimes] = useState([])

    const location = useLocation()
    const id = location.state

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiShowtimeSearchMovies(id)
        setShowtimes(res.showtimes)
    }

    return (
        <div className="showtime-wrapper">
            {showtimes && showtimes.length > 0 ? showtimes.map(item =>
                <div key={item._id} className="item-wrapper">
                    <div className="item">
                        <div className="row">
                            Phim:
                            <h5>
                                {item.movie.title}
                            </h5>
                        </div>
                        <div className="row">
                            Rạp:
                            <h5>
                                {item.theater.name}
                            </h5>
                        </div>
                        <div className="row">
                            Ngày:
                            <h5>
                                {item.date}
                            </h5>
                        </div>
                        <div className="row">
                            Giờ:
                            <h5>
                                {item.time}
                            </h5>
                        </div>
                        <div className="row">
                            Số vé:
                            <h5>
                                {item.number} / {item.number}
                            </h5>
                        </div>
                        <div className="feature">
                            <div onClick={() => {
                                alert('Đã thêm vé vào giỏ hàng!')
                            }} className='cart'>Thêm</div>
                        </div>
                    </div>
                </div>) :
                <div className='exist'>Hiện tại chưa có xuất chiếu</div>
            }
        </div>
    );
}

export default MovieDetail

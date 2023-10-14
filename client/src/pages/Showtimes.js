import React, { useState, useEffect } from 'react'
import { apiShowtimeRead } from '../services'

function Showtimes() {
    const [showtimes, setShowtimes] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiShowtimeRead()
        setShowtimes(res.showtimes)
    }

    return (
        <div className="showtime-wrapper">
            {showtimes && showtimes.map(item =>
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
                </div>)
            }
        </div>
    );
}

export default Showtimes

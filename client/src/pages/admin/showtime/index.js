import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiShowtimeRead, apiShowtimeDelete } from '../../../services'

export default function Read() {
    const [showtimes, setShowtimes] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiShowtimeRead()
        setShowtimes(res.showtimes)
    }

    const deleteShowtime = async id => {
        if (window.confirm("Delete")) {
            await apiShowtimeDelete(id)
            fetchData()
        }
    }

    return (
        <div className="showtime-wrapper">
            {showtimes && showtimes.length > 0 && showtimes.map(item => {
                return <div key={item._id} className="item-wrapper">
                    <div className="item">
                        <div className="row">
                            Phim:
                            <h5>
                                {item.movie && item.movie.title}
                            </h5>
                        </div>
                        <div className="row">
                            Rạp:
                            <h5>
                                {item.theater && item.theater.name}
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
                                {item.quantity ? item.number - item.quantity : item.number} / {item.number}
                            </h5>
                        </div>
                        <div className="feature">
                            <div className="row">
                                <Link to='/admin/showtime/update' state={item}>
                                    Sửa
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div onClick={() => deleteShowtime(item._id)} className="feature">
                                    Xoá
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })
            }
        </div>
    )
}

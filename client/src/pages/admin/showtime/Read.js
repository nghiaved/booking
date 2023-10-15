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
        <div className='read'>
            <Link to='/admin/showtime/create'>Create</Link>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Movie</th>
                        <th>Theater</th>
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
        </div>
    )
}

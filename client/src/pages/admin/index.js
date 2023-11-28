import React, { useState, useEffect } from 'react'
import Showtimes from './showtime'
import Movies from './movie'
import Theaters from './theater'
import { apiShowtimeRead } from '../../services'

export default function Home() {
    const [showtimes, setShowtimes] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiShowtimeRead()
        setShowtimes(res.showtimes)
    }
    const total = showtimes && showtimes.length > 0 && showtimes.reduce(function (total, item) {
        return total + (item.quantity || 0)
    }, 0)

    const calTotal = () => {
        const value = showtimes.reduce(function (total, num) {
            return total + num.quantity * 100000
        }, 0)
        let price = value.toString().split('').reverse()
        let priceEnd = ''
        price.map((item, index) => {
            if (++index % 3 == 0 && index != price.length) {
                item += '.'
            }
            priceEnd += item
        })
        return priceEnd.split('').reverse().join('')
    }

    return (
        <div className='read'>
            <h1>Thống kê</h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Phim</th>
                    <th>Rạp</th>
                    <th>Ngày</th>
                    <th>Giờ</th>
                    <th>Số vé</th>
                    <th>Đã bán</th>
                </tr>
                {showtimes && showtimes.length > 0 && showtimes.map((item, index) => {
                    return <tr>
                        <th>{++index}</th>
                        <td>{item.movie.title}</td>
                        <td>{item.theater.name}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.number}</td>
                        <td>{item.quantity}</td>
                    </tr>
                })}
            </table>
            <h3>Tổng số vé đã bán: {total}</h3>
            <h3>Tổng số tiền thu được: {calTotal()}đ</h3>
            <h1>Showtime</h1>
            <Showtimes />
            <h1>Movies</h1>
            <Movies />
            <h1>Theaters</h1>
            <Theaters />
        </div>
    )
}

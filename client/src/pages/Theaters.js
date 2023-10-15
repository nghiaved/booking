import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiTheaterRead } from '../services'

function Theaters({ isHome }) {
    const [theaters, setTheaters] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        //Lấy ra tất cả rạp
        const res = await apiTheaterRead()
        //Nếu nằm ở trang chủ thì hiện 3 rạp
        setTheaters(isHome ? res.theaters.slice(0, 3) : res.theaters)
    }

    return (
        <div className="theater-wrapper">
            {theaters && theaters.map(item =>
                <div key={item._id} className="item-wrapper">
                    <div className="item">
                        <img src={item.image} alt="" />
                        <div className="title">
                            {item.name}
                        </div>
                        <div className="feature">
                            <Link to={`/theater/${item._id}`} state={item._id}>Xem thêm</Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
}

export default Theaters;
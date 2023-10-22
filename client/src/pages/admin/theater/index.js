import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiTheaterRead, apiTheaterDelete } from '../../../services'

export default function Read() {
    const [theaters, setTheaters] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiTheaterRead()
        setTheaters(res.theaters)
    }

    const deleteTheater = async id => {
        if (window.confirm("Delete")) {
            await apiTheaterDelete(id)
            fetchData()
        }
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
                            <Link to='/admin/theater/update' state={item}>Edit</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link onClick={() => deleteTheater(item._id)}>Delete</Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

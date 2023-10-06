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
        <div className='read'>
            <Link to='/admin/theater/create'>Create</Link>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {theaters.length > 0 ? theaters.map((item, index) =>
                        <tr key={item._id}>
                            <td>{++index}</td>
                            <td>{item.name}</td>
                            <td>
                                <img src={item.image} alt='' />
                            </td>
                            <td>
                                <Link to='/admin/theater/update' state={item}>
                                    <i className="fa-solid fa-pen btn-edit"></i>
                                </Link>
                            </td>
                            <td>
                                <i onClick={() => deleteTheater(item._id)} className="fa-solid fa-trash btn-delete"></i>
                            </td>
                        </tr>
                    ) :
                        <tr>
                            <td colSpan='6'>Không có dữ liệu</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

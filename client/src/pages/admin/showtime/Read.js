import React from 'react'
import { Link } from 'react-router-dom'
import Showtimes from '.'

export default function Read() {
    return (
        <div className='read'>
            <Link to='/admin/showtime/create'>Create</Link>
            <Showtimes />
        </div>
    )
}

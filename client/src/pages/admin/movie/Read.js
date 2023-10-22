import React from 'react'
import { Link } from 'react-router-dom'
import Movies from '.'

export default function Read() {
    return (
        <div className='read'>
            <Link to='/admin/movie/create'>Create</Link>
            <Movies />
        </div>
    )
}

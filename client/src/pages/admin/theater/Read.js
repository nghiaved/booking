import React from 'react'
import { Link } from 'react-router-dom'
import Theaters from '.'

export default function Read() {
    return (
        <div className='read'>
            <Link to='/admin/theater/create'>Create</Link>
            <Theaters />
        </div>
    )
}

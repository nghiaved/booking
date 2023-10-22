import React from 'react'
import Showtimes from './showtime'
import Movies from './movie'
import Theaters from './theater'

export default function Home() {
    return (
        <div className='read'>
            <h1>Showtime</h1>
            <Showtimes />
            <h1>Movies</h1>
            <Movies />
            <h1>Theaters</h1>
            <Theaters />
        </div>
    )
}

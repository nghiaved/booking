import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const logout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userInfo')
        window.location.href = '/'
    }

    return (
        <div id="header">
            <a className="logo" href="/">BookingAdmin</a>
            <nav>
                <NavLink to='/admin/'>Trang chủ</NavLink>
                <NavLink to='/admin/showtime'>Lịch chiếu</NavLink>
                <NavLink to='/admin/movie'>Phim</NavLink>
                <NavLink to='/admin/theater'>Rạp chiếu</NavLink>
            </nav>
            <button className="user" onClick={logout}>
                {userInfo.username}
                &nbsp;
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </div>
    )
}

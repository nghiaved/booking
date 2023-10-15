import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Header() {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const logout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userInfo')
        window.location.href = '/'
    }

    return (
        <div className='header'>
            <div className='header-top'>
                <div className='top-container'>
                    <div className='item-left'>
                        <div className='left-item'>
                            <Link target="_blank" to='https://www.facebook.com/'>
                                <i className="fa-brands fa-square-facebook"></i>
                                Facebook
                            </Link>
                        </div>
                        <div className='left-item'>

                            <Link target="_blank" to='https://github.com/'>
                                <i className="fa-brands fa-square-github"></i>
                                GitHub
                            </Link>
                        </div>
                    </div>
                    <div className='item-right'>
                        {!isLoggedIn ?
                            <>
                                <div className='right-item'>
                                    <Link to='login'>
                                        Đăng nhập
                                    </Link>
                                </div>
                                <div className='right-item'>
                                    <Link to='register'>
                                        Đăng ký
                                    </Link>
                                </div>
                            </> :
                            <>
                                <div className='right-item'>
                                    <div className='menu'>
                                        {userInfo && userInfo.username}
                                        <div className='user-action'>
                                            <div className='item'>
                                                <Link to='/cart'>Giỏ hàng</Link>
                                            </div>
                                            {userInfo && userInfo.username === 'admin' &&
                                                <Link to='/admin/' className='item'>Quản lý</Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='right-item'>
                                    <div className='log-out' onClick={logout}>
                                        Đăng xuất
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className='header-main'>
                <div className='item'>
                    <NavLink to='/'>
                        Trang chủ
                    </NavLink>
                </div>
                <div className='item'>
                    <NavLink to='/showtimes'>
                        Mua vé
                    </NavLink>
                </div>
                <div className='item'>
                    <NavLink to='/movies'>
                        Phim
                    </NavLink>
                </div>
                <div className='item'>
                    <NavLink to='/theaters'>
                        Rạp chiếu phim
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

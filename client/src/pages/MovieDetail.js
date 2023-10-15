import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiShowtimeSearchMovies } from '../services'

function MovieDetail() {
    const [showtimes, setShowtimes] = useState([])
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [cartId, setCartId] = useState(JSON.parse(localStorage.getItem('cartId')) || [])

    //Lấy ra tên phim cần lọc
    const location = useLocation()
    const id = location.state

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        //Lọc vé phim theo tên phim
        const res = await apiShowtimeSearchMovies(id)
        setShowtimes(res.showtimes)
    }

    //Lưu thông tin giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('cartId', JSON.stringify(cartId))

    return (
        <div className="showtime-wrapper">
            {showtimes && showtimes.length > 0 ? showtimes.map(item =>
                <div key={item._id} className="item-wrapper">
                    <div className="item">
                        <div className="row">
                            Phim:
                            <h5>
                                {item.movie.title}
                            </h5>
                        </div>
                        <div className="row">
                            Rạp:
                            <h5>
                                {item.theater.name}
                            </h5>
                        </div>
                        <div className="row">
                            Ngày:
                            <h5>
                                {item.date}
                            </h5>
                        </div>
                        <div className="row">
                            Giờ:
                            <h5>
                                {item.time}
                            </h5>
                        </div>
                        <div className="row">
                            Số vé:
                            <h5>
                                {item.number} / {item.number}
                            </h5>
                            <input disabled={cartId.includes(item._id) ? true : false} type='number' onChange={e => {
                                item.quantity = e.target.value
                            }} defaultValue='1' min='1' max='99' />
                        </div>
                        <div className={!cartId.includes(item._id) ? 'feature' : 'feature danger'}>
                            <div onClick={() => {
                                //Đăng nhập xong mới được thêm vé vào giỏ hàng nếu không chuyển sang trang đăng nhập
                                if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
                                    if (!cartId.includes(item._id)) {
                                        //Thêm vé vào giỏ hàng
                                        setCartId([...cartId, item._id])
                                        setCart([...cart, { ...item, quantity: item.quantity }])
                                    } else {
                                        //Xoá vé ra khỏi giỏ hàng
                                        setCartId(cartId.filter(el => el !== item._id))
                                        setCart(cart.filter(el => el._id !== item._id))
                                    }
                                } else {
                                    window.location.href = '/login'
                                }
                            }} className='cart'>{!cartId.includes(item._id) ? 'Thêm' : 'Xoá'}</div>
                        </div>
                    </div>
                </div>) :
                <div className='exist'>Hiện tại chưa có xuất chiếu</div>
            }
        </div>
    );
}

export default MovieDetail

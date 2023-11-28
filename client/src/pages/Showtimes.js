import React, { useState, useEffect } from 'react'
import { apiShowtimeRead, apiShowtimeUpdate, apiCartCreate } from '../services'

function Showtimes() {
    const [showtimes, setShowtimes] = useState([])
    const [search, setSearch] = useState('')
    const [cartId, setCartId] = useState(JSON.parse(localStorage.getItem('cartId')) || [])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiShowtimeRead()
        setShowtimes(res.showtimes)
    }

    localStorage.setItem('cartId', JSON.stringify(cartId))

    return (
        <div>
            <span className='span-loc-phim'>Lọc vé:</span>
            <input className='input-loc-phim' onChange={e => setSearch(e.target.value)} placeholder='Tìm xuất chiếu' />
            <div className="showtime-wrapper">
                {showtimes && showtimes.length > 0 && showtimes.filter(item => {
                    return search.toLowerCase() === '' ? item : item.time.toLowerCase().includes(search.toLowerCase())
                        || item.movie.title.toLowerCase().includes(search.toLowerCase())
                        || item.theater.name.toLowerCase().includes(search.toLowerCase())
                        || item.date.toLowerCase().includes(search.toLowerCase())
                }).map(item => {
                    return <div key={item._id} className="item-wrapper">
                        <div className="item">
                            <div className="row">
                                Phim:
                                <h5>
                                    {item.movie && item.movie.title}
                                </h5>
                            </div>
                            <div className="row">
                                Rạp:
                                <h5>
                                    {item.theater && item.theater.name}
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
                                    {item.quantity ? item.number - item.quantity : item.number} / {item.number}
                                </h5>
                                <input disabled={cartId.includes(item._id) ? true : false} type='number' onChange={async e => {
                                    item.quantity = e.target.value
                                    await apiShowtimeUpdate(item)
                                }} defaultValue={item.quantity ? item.quantity : 1} min='1' max='99' />
                            </div>

                            <div className={!cartId.includes(item._id) ? 'feature' : 'feature danger'}>
                                <div onClick={async () => {
                                    //Đăng nhập xong mới được thêm vé vào giỏ hàng nếu không chuyển sang trang đăng nhập
                                    if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
                                        if (!cartId.includes(item._id)) {
                                            if (!item.quantity)
                                                item.quantity = 1
                                            //Thêm vé vào giỏ hàng
                                            await apiShowtimeUpdate(item)
                                            setCartId([...cartId, item._id])
                                            await apiCartCreate({ ...item, user: userInfo._id })
                                        }
                                    } else {
                                        window.location.href = '/login'
                                    }
                                }} className='cart'>{!cartId.includes(item._id) ? 'Thêm' : 'Đã thêm vào giỏ hàng'}</div>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    );
}

export default Showtimes

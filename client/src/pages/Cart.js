import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiCartRead, apiCartDelete } from '../services'

function Cart() {
    const [cart, setCart] = useState([])
    const [cartId, setCartId] = useState(JSON.parse(localStorage.getItem('cartId')) || [])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiCartRead(userInfo._id)
        setCart(res.carts)
    }

    // Tính tổng giá tiền
    const calTotal = () => {
        const value = cart.reduce(function (total, num) {
            return total + (num.quantity || 1) * 100000
        }, 0)
        let price = value.toString().split('').reverse()
        let priceEnd = ''
        price.map((item, index) => {
            if (++index % 3 == 0 && index != price.length) {
                item += '.'
            }
            priceEnd += item
        })
        return priceEnd.split('').reverse().join('')
    }

    localStorage.setItem('cartId', JSON.stringify(cartId))

    return (
        <div className="showtime-wrapper">
            {cart && cart.length > 0 ? cart.map(item =>
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
                                {item.quantity ? <span>x{item.quantity}</span> : 'x1'}
                            </h5>
                        </div>
                        <div className="row">
                            Tổng giá:
                            <h5>
                                {item.quantity ? <span>{item.quantity * 100}.000 VND</span> : '100.000 VND'}
                            </h5>
                        </div>
                        <div className="feature">
                            <button onClick={async () => {
                                //Xoá vé ra khỏi giỏ hàng
                                if (window.confirm("Xóa vĩnh viễn?")) {
                                    await apiCartDelete(item._id)
                                    setCartId(cartId.filter(el => el !== item._id))
                                    fetchData()
                                }
                            }}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            ) :
                <div className='exist'>
                    Vỏ hàng trống
                    <Link to={`/showtimes`}>Mua vé</Link>
                </div>
            }
            {cart && cart.length > 0 && <div className='pay'>
                <span onClick={() => {
                    // Chuyển tiếp sang trang thanh toán
                    window.location.href = '/checkout'
                }}>Đặt vé ( {calTotal()}đ )</span>
            </div>}
        </div>
    );
}

export default Cart

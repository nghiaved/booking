import { useState } from 'react'
import { Link } from 'react-router-dom'

function Cart() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [cartId, setCartId] = useState(JSON.parse(localStorage.getItem('cartId')) || [])
    // Tính tổng giá tiền
    const total = cart && cart.length > 0 && cart.reduce(function (total, item) {
        return total + 100 * (item.quantity || 1)
    }, 0)

    //Lưu thông tin giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart))
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
                            <button onClick={() => {
                                //Xoá vé ra khỏi giỏ hàng
                                if (window.confirm("Xóa vĩnh viễn?")) {
                                    setCartId(cartId.filter(el => el !== item._id))
                                    setCart(cart.filter(el => el._id !== item._id))
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
                }}>Đặt vé ( {total}.000đ )</span>
            </div>}
        </div>
    );
}

export default Cart

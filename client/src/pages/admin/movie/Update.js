import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FileBase64 from 'react-file-base64'
import { apiMovieUpdate } from '../../../services'

export default function Update() {
    const location = useLocation()
    // movie = thông tin của phim cần sửa
    const movie = location.state

    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()
    const [image, setImage] = useState(movie.image)

    const navigate = useNavigate()

    const onSubmit = async (data, e) => {
        if (!image) {
            setMessage('No image')
        } else {
            data.image = image
            data._id = movie._id
            try {
                const res = await apiMovieUpdate(data)
                if (res.movie) {
                    navigate('/admin/movie')
                }
                e.target.reset()
            } catch (e) {
                setMessage('Failure')
            }
        }
    }

    return (
        <div className='create'>
            <Link to='/admin/movie'>Read</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Update</h2>
                {/* Đặt giá trị mặc định của input là giá trị ban đầu của phim */}
                <input required autoComplete="off" defaultValue={movie.title} {...register('title', { required: true })} placeholder='Title' />
                <input required autoComplete="off" defaultValue={movie.time} {...register('time', { required: true })} placeholder='Time' />
                <input required autoComplete="off" defaultValue={movie.date} {...register('date', { required: true })} placeholder='Date' />
                <label>
                    {/* Xử lý chuyển ảnh thành chuỗi */}
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => {
                            setImage(base64)
                        }}
                    />
                    Ảnh
                </label>
                {/* Preview ảnh lúc tạo/ sửa */}
                {image && <img src={image} alt='' />}
                {/* Thông báo thành công/thất bại */}
                <p>{message && message} </p>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

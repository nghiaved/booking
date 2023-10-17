import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FileBase64 from 'react-file-base64'
import { apiMovieCreate } from '../../../services'

export default function Create() {
    //Xử lý form
    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()
    const [image, setImage] = useState()

    //Nhập dữ liệu từ form = data
    const onSubmit = async (data, e) => {
        if (!image) {
            setMessage('No image')
        } else {
            //Thêm 1 thuộc tính trong object tên image
            data.image = image
            try {
                //Gọi APT tới server để tạo phim mới sau đó nhận dữ liệu về gán vào biên res
                const res = await apiMovieCreate(data)
                if (res.movie) {
                    //In thông báo
                    setMessage('Success')
                }
                //Xoá dữ trong input
                e.target.reset()
                setImage()
            } catch (e) {
                //In thông báo
                setMessage('Failure')
            }
        }
    }

    return (
        <div className='create'>
            <Link to='/admin/movie'>Read</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Create</h2>
                <input required autoComplete="off" {...register('title', { required: true })} placeholder='Title' />
                <input required autoComplete="off" {...register('time', { required: true })} placeholder='Time' />
                <input required autoComplete="off" {...register('date', { required: true })} placeholder='Date' />
                <label>
                    {/* Thư viện xử lý ảnh chuyển ảnh thành chuỗi */}
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => {
                            setImage(base64)
                        }}
                    />
                    Ảnh
                </label>
                {/* Preview ảnh đã chọn */}
                {image && <img src={image} alt='' />}
                {/* In thông báo lỗi */}
                <p>{message && message} </p>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

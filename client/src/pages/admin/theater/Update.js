import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FileBase64 from 'react-file-base64'
import { apiTheaterUpdate } from '../../../services'

export default function Update() {
    const location = useLocation()
    const theater = location.state

    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()
    const [image, setImage] = useState(theater.image)

    const navigate = useNavigate()

    const onSubmit = async (data, e) => {
        if (!image) {
            setMessage('No image')
        } else {
            data.image = image
            data._id = theater._id
            try {
                const res = await apiTheaterUpdate(data)
                if (res.theater) {
                    navigate('/admin/theater')
                }
                e.target.reset()
            } catch (e) {
                setMessage('Failure')
            }
        }
    }

    return (
        <div className='create'>
            <Link to='/admin/theater'>Read</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Update</h2>
                <input required autoComplete="off" defaultValue={theater.name} {...register('name', { required: true })} placeholder='Name' />
                <label>
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => {
                            setImage(base64)
                        }}
                    />
                    Ảnh
                </label>
                {image && <img src={image} alt='' />}
                <p>{message && message} </p>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

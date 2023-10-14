import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FileBase64 from 'react-file-base64'
import { apiMovieCreate } from '../../../services'

export default function Create() {
    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()
    const [image, setImage] = useState()

    const onSubmit = async (data, e) => {
        if (!image) {
            setMessage('No image')
        } else {
            data.image = image
            try {
                const res = await apiMovieCreate(data)
                if (res.movie) {
                    setMessage('Success')
                }
                e.target.reset()
                setImage()
            } catch (e) {
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
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

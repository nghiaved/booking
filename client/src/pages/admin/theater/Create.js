import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FileBase64 from 'react-file-base64'
import { apiTheaterCreate } from '../../../services'

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
                const res = await apiTheaterCreate(data)
                if (res.theater) {
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
            <Link to='/admin/theater'>Read</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Create</h2>
                <input required autoComplete="off" {...register('name', { required: true })} placeholder='Name' />
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

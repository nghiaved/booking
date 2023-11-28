import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080'
})

axiosClient.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response.data)
)

//User
export const apiUserRegister = data =>
    axiosClient.post('/api/user/register', data)

export const apiUserLogin = data =>
    axiosClient.post('/api/user/login', data)

//Movie
export const apiMovieCreate = data =>
    axiosClient.post('/api/movie/create', data)

export const apiMovieRead = () =>
    axiosClient.get('/api/movie/read')

export const apiMovieUpdate = data =>
    axiosClient.put(`/api/movie/update/${data._id}`, data)

export const apiMovieDelete = id =>
    axiosClient.delete('/api/movie/delete/' + id)

//Theater
export const apiTheaterCreate = data =>
    axiosClient.post('/api/theater/create', data)

export const apiTheaterRead = () =>
    axiosClient.get('/api/theater/read')

export const apiTheaterUpdate = data =>
    axiosClient.put(`/api/theater/update/${data._id}`, data)

export const apiTheaterDelete = id =>
    axiosClient.delete('/api/theater/delete/' + id)

//Showtime
export const apiShowtimeCreate = data =>
    axiosClient.post('/api/showtime/create', data)

export const apiShowtimeRead = () =>
    axiosClient.get('/api/showtime/read')

export const apiShowtimeUpdate = data =>
    axiosClient.put(`/api/showtime/update/${data._id}`, data)

export const apiShowtimeDelete = id =>
    axiosClient.delete('/api/showtime/delete/' + id)

export const apiShowtimeSearchMovies = id =>
    axiosClient.get('/api/showtime/search/movie?_id=' + id)

export const apiShowtimeSearchTheaters = id =>
    axiosClient.get('/api/showtime/search/theater?_id=' + id)

//Cart
export const apiCartCreate = data =>
    axiosClient.post('/api/cart/create', data)

export const apiCartRead = id =>
    axiosClient.get('/api/cart/read?user=' + id)

export const apiCartDelete = id =>
    axiosClient.delete('/api/cart/delete/' + id)
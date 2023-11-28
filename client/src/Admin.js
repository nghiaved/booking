import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import HomePage from './pages/admin'
import Layout from './components/admin/Layout'
import MovieCreate from './pages/admin/movie/Create'
import MovieRead from './pages/admin/movie/Read'
import MovieUpdate from './pages/admin/movie/Update'
import TheaterCreate from './pages/admin/theater/Create'
import TheaterRead from './pages/admin/theater/Read'
import TheaterUpdate from './pages/admin/theater/Update'
import ShowtimeCreate from './pages/admin/showtime/Create'
import ShowtimeRead from './pages/admin/showtime/Read'
import ShowtimeUpdate from './pages/admin/showtime/Update'
import MovieDetail from './pages/MovieDetail'
import TheaterDetail from './pages/TheaterDetail'

export default function Admin() {
    return (
        //Nếu chưa đăng nhập thì không được vào quản lý
        JSON.parse(localStorage.getItem('isLoggedIn')) === true
            ?
            <Layout>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/movie/' element={<MovieRead />} />
                    <Route path='/movie/:id' element={<div className='app-wrapper'><MovieDetail /></div>} />
                    <Route path='/movie/create' element={<MovieCreate />} />
                    <Route path='/movie/update' element={<MovieUpdate />} />
                    <Route path='/theater/' element={<TheaterRead />} />
                    <Route path='/theater/:id' element={<div className='app-wrapper'><TheaterDetail /></div>} />
                    <Route path='/theater/create' element={<TheaterCreate />} />
                    <Route path='/theater/update' element={<TheaterUpdate />} />
                    <Route path='/showtime/' element={<ShowtimeRead />} />
                    <Route path='/showtime/create' element={<ShowtimeCreate />} />
                    <Route path='/showtime/update' element={<ShowtimeUpdate />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Layout>
            : <Navigate to='/login' />
    )
}

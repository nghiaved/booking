import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import HomePage from './pages'
import Movies from './pages/Movies'
import Theaters from './pages/Theaters'
import Showtimes from './pages/Showtimes'
import MovieDetail from './pages/MovieDetail'
import TheaterDetail from './pages/TheaterDetail'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/showtimes' element={<Showtimes />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/theaters' element={<Theaters />} />
        <Route path='/theater/:id' element={<TheaterDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App

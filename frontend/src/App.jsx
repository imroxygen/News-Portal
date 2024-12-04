import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupForm from './auth/forms/SignupForm'
import SigninForm from './auth/forms/SigninForm'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import NewsArticles from './pages/NewsArticles'


const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/sign-up' element={<SignupForm/>} />
      <Route path='/sign-in' element={<SigninForm/>}/>

      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/news' element={<NewsArticles/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
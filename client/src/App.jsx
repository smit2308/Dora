import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import {logo} from './assets'
import {Home, CreatePost} from './pages'
import { Button } from './componenets'

function App() {


  return (
      <BrowserRouter>
        <header className='max-container flex flex-row justify-between items-center
        px-20 py-10
          '>
          <Link to='/'>
            <img src={logo} alt="logo" 
            className='w-28 object-contain'
            />
          </Link>

          <Link to='/create-post' >
            <Button
             color={"bg-gray-800"}
             label={"Create"} />
           </Link> 
          
        </header>

        <main className='max-container px-20 py-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
   
  )
}

export default App

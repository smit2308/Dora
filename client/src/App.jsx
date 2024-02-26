import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import {Dora_logo} from './assets'
import {Home, CreatePost, Community} from './pages'
import { Button } from './componenets'
import {links} from './constants' 
function App() {


  return (
    <section className='max-container flex flex-col  items-center '> 
      <BrowserRouter>
        <header className='fixed z-30  backdrop-blur-xl max-container w-full flex flex-row justify-between  items-center
        px-20 
          '>
          <Link to='/' className='flex items-center justify-center  '>
            <img src={Dora_logo} alt="Dora" 
            className='w-32 object-contain h-32'
            />
            <h1 className='h-max w-max text-4xl font-light font-playfair text-gray-800 -ml-2 '>
              Dora
            </h1>
            
          </Link>

          <div className='flex flex-row gap-10'>
            {links.map(link => (
              <Link to={link.path} key={link.name} className='text-xl text-gray-800'>
                {link.name}
              </Link>
            ))}
          </div>
          
        </header>

        <main className='max-container px-20 py-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/community' element={<Community />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </section>
   
  )
}

export default App

import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import {logo} from './assets'
import {Home, CreatePost, Community} from './pages'
import { Button } from './componenets'

function App() {

const links = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Community',
    path: '/community'
  },
  {
    name: 'Create',
    path: '/create-post'
  }
]
  return (
    <section className='max-container flex flex-col  items-center '> 
      <BrowserRouter>
        <header className='fixed z-30  backdrop-blur-xl max-container w-full flex flex-row justify-between  items-center
        px-20 p-6
          '>
          <Link to='/'>
            <img src={logo} alt="logo" 
            className='w-28 object-contain'
            />
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

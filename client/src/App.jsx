import {React, useState, useRef, useEffect} from 'react'
import { BrowserRouter, Link, Route, Routes, NavLink } from 'react-router-dom'
import {Dora_logo} from './assets'
import { HiMenu } from "react-icons/hi";
import {Home, CreatePost, Community} from './pages'
import { Button } from './componenets'
import {links} from './constants' 
import { HiOutlineX } from "react-icons/hi";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useIsPresent,
  useAnimation
} from "framer-motion";

function App() {

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const menuAnimation = useAnimation();
  const isPresent = useIsPresent();
  const menuRef = useRef();

  const animateMenu = async () => {
    if (isOverlayOpen) {
      await menuAnimation.start({
        scaleX: '100%',
        transition: { duration: 0.4, ease: 'circOut', delay: 0 },
      });
    } else {
      await menuAnimation.start({
        scaleX: '0%',
        transition: { duration: 0.2, ease: 'circIn', delay: 0 },
      });
    }
  };
  
    // Call animateMenu whenever isMenuOpen changes
    useEffect(() => {
      animateMenu();
    }, [isOverlayOpen]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const openOverlay = () => {
    setIsOverlayOpen(true)
  }

  const closeOverlay = () => {
    setIsOverlayOpen(false)
  }

  return (
    <section className='max-container flex flex-col  items-center '> 
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <header className=' max-md:-mb-24 md:fixed z-30  md:backdrop-blur-xl max-container w-full flex justify-between  items-center
       lg:px-20 md:px-10 px-6 
          '>
          <Link to='/' className='flex items-center w-max b'>
            <img src={Dora_logo} alt="Dora" 
            className='max-md:w-20 max-md:h-20 w-32 h-32'
            />
            <h1 className='h-max w-max  max-md:text-2xl text-4xl font-light font-playfair text-gray-800 -ml-2 '>
              Dora
            </h1>
            
          </Link>

    

          <div className='flex flex-row gap-10 max-md:hidden'>
            {links.map(link => (
              <NavLink to={link.path} key={link.name}  className={(navData) => (navData.isActive ? "text-accent text-xl" : 'text-xl text-gray-800 hover:text-accent')}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <button onClick={openOverlay} className='md:hidden'>
                <HiMenu className='h-8 w-8 text-gray-800' />
              </button>
                   
        </header>

        {      isOverlayOpen &&
        <div

        className='fixed top-0 left-0 z-30 w-screen h-screen backdrop-blur-sm  ' >

          <div className='w-full h-full  bg-black opacity-40' />
          </div>
        
        }

                  <motion.div
      ref={menuRef}
      initial={{ scaleX: '0%' }}
      animate={menuAnimation}
      style={{ originX: isPresent ? 1 : 0 }}
      className='fixed h-screen w-[300px] text-secondary bg-primary 
      shadow-image1 right-0 top-0 pt-24 pr-10 flex flex-col gap-10 rounded-b-lg lg:hidden shadow-nav 
      font-inter -mt-1 z-30 rounded-l-lg '
    >
      <button
        className='hover:scale-110 md:hidden fixed right-7 top-6 p-2 z-40'
        onClick={closeOverlay}
      >
        <HiOutlineX size={32} color='#b7404b' />
      </button>
      <ul className='flex flex-col gap-4'>
        {links.map((link, index) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease: 'circOut', delay: index * 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className='w-full text-right text-xl text-gray-800 hover:text-accent'
          >
            <Link
              to={link.path}
              onClick={closeOverlay}
              >
            
        
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>


        

        <main className='max-container lg:px-20 md:px-10 px-6 py-10'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/community' element={<Community />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
      </AnimatePresence>
    </section>
   
  )
}

export default App

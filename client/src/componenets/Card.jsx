import React from 'react'
import Button from './Button'
import { HiOutlineDownload, HiOutlineExternalLink } from "react-icons/hi";
import { useState, useEffect, useRef } from 'react';

import { downloadImage } from '../utils'

const alphabetColors = {
  A: '#FF5733', // Orange
  B: '#33FF57', // Lime Green
  C: '#5733FF', // Royal Blue
  D: '#FF33E9', // Pink
  E: '#33FFFD', // Cyan
  F: '#FDFF33', // Yellow
  G: '#3364FF', // Azure
  H: '#FF336F', // Coral
  I: '#33FFA9', // Aqua
  J: '#85FF33', // Spring Green
  K: '#333FFF', // Blue
  L: '#FFBC33', // Gold
  M: '#7B33FF', // Purple
  N: '#FF3333', // Red
  O: '#FFD933', // Yellow Orange
  P: '#33FF7A', // Medium Spring Green
  Q: '#4A33FF', // Indigo
  R: '#FF9B33', // Orange Yellow
  S: '#33FFE5', // Turquoise
  T: '#FF333E', // Crimson
  U: '#337BFF', // Dodger Blue
  V: '#F933FF', // Fuchsia
  W: '#8BFF33', // Chartreuse
  X: '#7D33FF', // Violet
  Y: '#FFE233', // Lemon
  Z: '#33FFD5'  // Aqua Marine
};


const Card = ({_id, name, prompt, image}) => {

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const overlayRef = useRef(null);

  const openOverlay = () => {
    setIsOverlayOpen(true)
    
  }

  const closeOverlay = () => {
    setIsOverlayOpen(false)
  }
  



  return (
    <div className='flex flex-col  relative font-inter group mx-auto '  ref={overlayRef}>

            {isOverlayOpen && (
        <div 
           className='fixed w-full h-full m-auto  left-0 top-0 right-0 bottom-0 z-30 bg-black bg-opacity-70 backdrop-blur-sm
              shadow-image2  overflow-clip
                flex justify-center items-center '>
                <div className='max-w-[700px]  flex ' >
                <img src={image} alt={prompt} className=' relative object-cover  rounded-lg'/>
                <button className='absolute backdrop-blur-md p-2 bg-white bg-opacity-15 hover:bg-opacity-30
                transition-all ease-in-out duration-200  rounded-lg flex justify-center items-center gap-2 font-inter text-xl text-black '
                    onClick={closeOverlay} >
                  Close
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                </div>

        </div>
      )}
      <img src={image} alt={prompt} className='relative object-cover rounded-lg'/>
      <div className='absolute group-hover:flex flex-col hidden 
      self-center
      lg:p-6 p-4 flex-wrap justify-between gap-6 lg:m-4 m-2 
      bottom-0  bg-white bg-opacity-80 backdrop-blur-md  rounded-lg'>
        <p className='text-sm  text-black text-left'>"{prompt}"</p>

        
                <div className='w-full flex flex-row  justify-between gap-6 items-end'>


              <div className={`text-sm  text-black  bg-[${alphabetColors[name[0].toUpperCase()]}]
              flex  text-left  rounded-lg p-2 `}>
{name
  .split(" ") // Split the name into words
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
  .join(" ")}
            </div>


      <div className='flex flex-row gap-4'>
      <button className='w-max hover:scale-110 transition-all ease-in-out duration-300'
      onClick={openOverlay} 
          >
            <HiOutlineExternalLink className='h-8 w-8 '/>
          </button>

          <button className='w-10 hover:scale-110 transition-all ease-in-out duration-300'
            onClick={() => downloadImage(_id, image)}>
       
            <HiOutlineDownload className='h-8 w-8 '/>
          </button>
      </div>

        </div>
      </div>
      
    </div>
  )
}

export default Card
import React from 'react'
import Button from './Button'
const Card = ({_id, name, prompt, image}) => {
  return (
    <button className='flex flex-col  relative font-inter group mx-auto'>
      <img src={image} alt={prompt} className='relative object-cover rounded-lg'/>
      <div className='absolute group-hover:flex hidden p-10  flex-col gap-4   inset-0  bg-black bg-opacity-75 rounded-lg'>
        <p className='text-xl text-white text-left'>"{prompt}"</p>
        <h2 className='text-xl font-light text-white text-left '>- {name}</h2>

      </div>
      
    </button>
  )
}

export default Card
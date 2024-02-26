import React from 'react'
import Button from './Button'
import { preview } from '../assets'
const FormField = ({label, type, name, placeholder, value, 
    handleChange, isSurpriseMe, handleSurpriseMe}) => {


  return (
    <div className='flex flex-col  gap-6'>
      <div className='flex gap-6 items-center'>

      <label
        htmlFor={name}
        className='font-inter text-lg text-gray-800'
      >
        {label}
      </label>

      {isSurpriseMe ? (
         <Button
           color={"bg-gray-800"}
           label={"Surprise Me !"}
           fontSize={"text-sm"}
           rounded={"rounded-md"}
           handleClick={handleSurpriseMe}
          />
      ):('')}
      
      </div>

      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
      />

      

    </div>
  )
}

export default FormField
import React from 'react';
import { useState } from 'react';

const Dropdown = ({  handleClick, name, value, list  }) => {

  const [isOpen, setIsOpen] = useState(false);
 
  const onClickPreventDefault = (e) => {
    
    e.preventDefault();

    try {
      handleClick(name, e.target.textContent.toLowerCase())
    } 
    catch (error) {
      console.log(error)
    }
    finally {
      setIsOpen(false)
    }
  }
  
  return (
    <div className='flex flex-col w-48 h-max text-gray-800 border-2 border-slate-100 font-inter rounded-lg shadow-lg '>
  <button
  className=" text-lg  focus:ring-2 
       px-6  py-1 text-center 
      inline-flex items-center  " 
  type="button"
  onClick={() => setIsOpen(!isOpen)}>
    {value.toUpperCase()}
  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg>
 
  </button>

   {isOpen && (
      <div id="dropdown" className="w-full  z-10  bg-white divide-y divide-gray-100   ">
      <ul >


  {
    list.map((item, index) => (
      <li key={item.value}>
      <button  className="w-full text-left   text-md block px-6 py-4 hover:bg-gray-200  "
          onClick={onClickPreventDefault}
           >
        {item.value.toUpperCase()}
   
      </button>
    </li>
    ))
  }

      </ul>
  </div>
  )} 
    </div>
  );
};

export default Dropdown;
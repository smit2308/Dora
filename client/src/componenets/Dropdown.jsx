import React from 'react';
import { useState } from 'react';
import { help } from '../assets';
import { OverlayFeatures } from '../constants';



const OverlayLayout = (
  { name,
    description,
    features,
    img }
) => {
  return (
    <div className='w-full flex max-md:flex-wrap  justify-between gap-6 '>
      <div className='flex flex-col    '>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-slate-100'>
          {name}
        </h2>
        <p className='text-lg text-gray-800 mb-4 max-w-sm  dark:text-slate-100'>
          {description}
        </p>
        <ul className='flex flex-col text-md text-gray-800 dark:text-slate-100 '>
          {features.map((feature, index) => (
            <li key={index} >
              - {feature}
            </li>
          ))}

        </ul>

      </div>
      <div className='flex w-2/3 rounded-lg overflow-clip '>
        <img src={img} alt={name} className='object-cover w-full ' />
      </div>
    </div>

  );
};



const Dropdown = ({ handleClick, name, value, list }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [option, setOption] = useState('')

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

  const openHelp = (e, option) => {
    e.preventDefault();
    setHelpOverlay(!helpOverlay)
    console.log(option, "option")
    setOption(option)
  }

  const closeHelp = (e) => {
    e.preventDefault();
    setHelpOverlay(false)
  }

  return (
    <section className='flex flex-col gap-6 text-gray-800'>

      {/* overlay */}
      {helpOverlay && (
        <div className='fixed max-w-2xl m-auto h-[70%] left-0 top-0 right-0 bottom-0 z-10 bg-white
            dark:bg-gray-800  shadow-image2 border-2 border-slate-50 dark:border-gray-900 rounded-lg
              p-10  flex flex-col gap-10  overflow-y-scroll dark:text-slate-100'>
          <div className='flex flex-row justify-between'>

            <h1 className='text-xl font-semibold  mb-10 flex flex-col '>
              {option[0].toUpperCase() + option.slice(1)}
              <span className='text-sm  '>
                Prompt: {option == 'model'? "Spongebob squarepants in India" :
                "Man eating soup on the beach"}
              </span>
            </h1>

            <button className='flex' onClick={closeHelp}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {
            OverlayFeatures[option].map((feature, index) => (
              <OverlayLayout
                name={feature.name}
                description={feature.description}
                features={feature.features}
                img={feature.img}
                key={index}
              />
            ))
          }


        </div>
      )}


      <div className='w-full flex flex-col gap-6 relative text-gray-900 dark:text-slate-100 ' >

        <div className='flex flex-row items-center'>
          <h1 className=' font-inter text-lg dark:text-slate-100 '>
            {name[0].toUpperCase() + name.slice(1)}
          </h1>
          <button
            onClick={(e) => openHelp(e, name)}>
            <img src={help} alt="help" className='w-6 h-6 ms-2 dark:invert' />
          </button>


        </div>
        <div className='flex flex-col w-48 h-maxborder-2 border-slate-100 font-inter rounded-lg shadow-lg '>
          <button
            className=" text-lg  focus:ring-1 rounded-lg focus:ring-white dark:bg-gray-800 bg-white 
       px-6  p-2 text-center 
      inline-flex items-center  "
            type="button"
            onClick={() => setIsOpen(!isOpen)}>
            {value.toUpperCase()}
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>

          </button>

          {isOpen && (
            <div id="dropdown" className="w-full  z-10  bg-white dark:bg-gray-800 divide-y divide-gray-100 rounded-b-lg   ">
              <ul >


                {
                  list.map((item, index) => (
                    <li key={item.value} className='group flex '>

                      <button className="w-full text-left      text-md block px-6 py-4 hover:bg-gray-200  "
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
      </div>
    </section>
  );
};

export default Dropdown;
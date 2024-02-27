import React, { version } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { preview } from '../assets'
import {getRandomPrompt} from '../utils'
import { FormField, Loader, Button, Dropdown } from '../componenets'
import g from 'file-saver'
import { modelOptions, qualityOptions, styleOptions  } from '../constants'



const CreatePost = () => {


  const [model, setModel] = useState(modelOptions[0])
  const [quality, setQuality] = useState(qualityOptions[0])
  const [style, setStyle] = useState(styleOptions[0])
  
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false)
  const [isdalle3, setIsDalle3] = useState(false)

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    image: '',
    model: model.value,
    quality: quality.value,
    style: style.value,
  })

  useEffect(() => {
    if(form.model === 'dall-e-3'){
      setIsDalle3(true)
    }
    else{
      setIsDalle3(false)
    }
  }, [form.model])



  const Printer = () =>
{
  console.log('printer')
  return null

}

const handleGenerate = async () => {
  console.log(form, "form")
  if(form.prompt){
    try {
          setGeneratingImage(true);
          const response = await fetch('http://localhost:8080/api/v1/dalle', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: form.prompt, model: form.model, quality: form.quality, style: form.style})
           })

           const data = await response.json();
            setForm({...form, image: `data:image/jpeg;base64,${data.image}`})
        }

        
        catch (error) {
          alert(error)
          
          
        }
        finally {
          setGeneratingImage(false)
        }
    
    }

    else{
      alert('Please enter a prompt')
    }
}



const handleFormSubmit = async (e) => {

  e.preventDefault();
  if(form.prompt && form.image && form.name){
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })

      await response.json()
      navigate('/')
    }
    catch (error) {
      alert(error)

    }
    finally {
      setLoading(false)
      
    }
  }
  else{
    alert('Please fill in all fields')
  }
  

}

const handleChange = (e) => {
  console.log(e.target.value, "target value")
  setForm({ ...form, [e.target.name]: e.target.value })

}

const handleSurpriseMe = (e) => {
  e.preventDefault();
  const randomPrompt = getRandomPrompt()
  setForm({ ...form, prompt: randomPrompt })
}

const handleDropdown =(parameter, value) => {
  
  setForm({ ...form, [parameter]: value })

}




  return (
    <section className='w-full flex flex-col max-container  mt-20 md:mt-32'>
      <h1 className=' font-playfair max-md:leading-[50px] max-md:text-4xl max-md:mb-6 leading-[80px] text-6xl font-bold mb-10  text-gray-800'>
        Create a new Image
      </h1>
      <p className='text-lg mb-10 max-md:text-md max-md:mb-6'>
        Instantly Generate AI Masterpieces from Your Prompts - Share, Inspire, and Amaze!
      </p>
      
      <form className='max-w-2xl' onSubmit={handleFormSubmit}>

        <div className='flex flex-col gap-10 mb-10'>

          <FormField
            label={"Name"}
            type={"text"}
            name={"name"}
            placeholder={"Your Name"}
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            label={"Prompt"}
            type={"text"}
            name={"prompt"}
            placeholder={'Spongebob Squarepants in the Blair Witch Project'}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          
          <div className='flex flex-row gap-10 max-md:flex-col '>
          <Dropdown
            name={"model"}
            value={form.model}
            list = {modelOptions}
            handleClick={handleDropdown}
            
    
            />

          <Dropdown
            name={"quality"}
            value={form.quality}
            list = {qualityOptions}
            handleClick={handleDropdown}
            
    
            />
          {isdalle3 && 
            (
              <Dropdown
              name={"style"}
              value={form.style}
              list = {styleOptions}
              handleClick={handleDropdown}  
              />
            )}


          </div>

          <Button
            width={"w-max"}
            label={`${generatingImage ? 'Generating Image...' : 'Generate Image'}`}
            color={"bg-accent"}
            handleClick={handleGenerate}
          />

          <div className='flex relative bg-gray-100 rounded-lg max-w-xl  '>
            {form.image?
              (
                <img src={form.image} alt={form.prompt}
                className='w-full h-full object-contain '
                />
              ):(
                <img src={preview} alt='preview'
                className='w-full h-full object-contain p-20 opacity-75'
                />
              )}


            {generatingImage && (
              <div className='absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 rounded-lg '>
                <Loader />
              </div>
            )}
          </div>

        </div>

    
          


        <div className='mt-10'>
          <p className='font-inter text-gray-900 text-lg'>You can download the image to your device or share the generated image in the community !</p>
          <div className='flex gap-10 mt-10'>
            <Button
              label={'Download'}
              color={'bg-gray-800'}
              onclick={() => g.saveAs(form.image, `Dora_"${form.prompt}".jpg`)}
            />
            <Button
            type={'submit'}
              label={'Share'}
              color={'bg-green-700'}
              
            />
          </div>  
        </div>
   
      </form>
    </section>
  )
}

export default CreatePost
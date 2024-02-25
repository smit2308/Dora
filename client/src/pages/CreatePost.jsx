import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { preview } from '../assets'
import {getRandomPrompt} from '../utils'
import { FormField, Loader, Button } from '../componenets'
import g from 'file-saver'




const CreatePost = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    image: ''
  })

  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false)

  const Printer = () =>
{
  console.log('printer')
  return null

}

const handleGenerate = async () => {
  if(form.prompt){
    try {
          setGeneratingImage(true);
          const response = await fetch('http://localhost:8080/api/v1/dalle', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: form.prompt})
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

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value })

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

const handleSurpriseMe = (e) => {
  e.preventDefault();
  const randomPrompt = getRandomPrompt()
  setForm({ ...form, prompt: randomPrompt })
}


  return (
    <section className='flex flex-col mt-32'>
      <h1 className=' font-playfair text-6xl font-bold  text-gray-800'>
        Create a new Post
      </h1>
      <p className='font-inter text-xl text-gray-800 mb-20 '>
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

          <Button
            width={"w-max"}
            label={`${generatingImage ? 'Generating Image...' : 'Generate Image'}`}
            color={"bg-accent"}
            handleClick={handleGenerate}
          />

          <div className='flex relative bg-gray-100 rounded-lg max-w-xl opacity-75 '>
            {form.image?
              (
                <img src={form.image} alt={form.prompt}
                className='w-full h-full object-contain '
                />
              ):(
                <img src={preview} alt='preview'
                className='w-full h-full object-contain p-20'
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
import React from 'react'
import { useState, useEffect } from 'react'
import {Card, Loader, FormField, Button} from '../componenets'
import { Link } from 'react-router-dom'
import { dalle, logo } from '../assets'

const RenderPosts = ({ data, title }) => {
  if (data.length > 0) {
    return data.map((post, index) => (
      <Card key={post.id} {...post}/>
    ));
  } else {
    return (
      <h2 className='font-bold text-accent text-xl'>
        {title}
      </h2>
    );
  }
};

const Home = () => {

  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => { 
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8080/api/v1/post',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (response.ok) {
          
          const result = await response.json()
          console.log(result.data, "result data")
          setPosts(result.data.reverse())
          
        }

        
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className='  flex flex-col  max-container items-center  '>
      <section className=' h-screen flex   ' >
        <div className='my-auto max-w-2xl flex flex-col items-center gap-10  '>
        <h1 className=' font-playfair text-[120px] text-center leading-[120px] font-bold text-gray-800'>
          Bring Your Ideas to Life
        </h1>
        <Link to='/create-post' >
          <Button 
            fontSize={"text-2xl font-light"}
            px={"px-20"}
            py={"py-4"}
            label={"Create"} />
        </Link>
        </div>
      </section>

      <div className='w-full flex flex-row justify-evenly mb-60  '>
      <h1 className=' text-2xl max-w-lg'>
          Using Dall-E AI Model by OpenAI to create realistic images from descriptions
        </h1>
        <div className='max-w-md flex flex-col justify-center items-center   p-4 pb-4  rounded-lg '> 
          <img src={logo} alt="logo" className='w-40 object-cover '/>
          <img src={dalle} alt="dalle" className='w-80 object-cover invert '/>
        </div>
        

       </div> 

      <div className='w-full flex flex-col '>

        <h1 className='w-full font-inter text-2xl font-bold  text-gray-800'>
          Look what the Community has been upto
        </h1>
        <p className='text-lg mb-20  '>
          A collection of Recent Posts from the Community
        </p>

        {/* <div className='mb-10'>
          <FormField />
        </div> */}

        <div className='text-xl font-inter'>
          {loading ?
          (
            <div className='flex justify-center items-center'>
              <Loader />
            </div>
          ):(
            <>
              {searchTerm && (
                <h2 className='text-xl mb-20'>
                  Search Results for "<span className='text-accent font-semibold text-xl '>
                    {searchTerm}
                  </span>"
                </h2>
              )}

              <div className='grid grid-cols-3 gap-4'>
                {searchTerm ?
                (
                  <RenderPosts
                    data={[]}
                    title={'No Search Results Found'}
                    />
                ):(
                  <RenderPosts
                    data={posts || []}
                    title={'NO POSTS FOUND'}
                    />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
    </section>
  )
}

export default Home
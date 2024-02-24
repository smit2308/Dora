import React from 'react'
import { useState, useEffect } from 'react'
import {Card, Loader, FormField, Button} from '../componenets'
import { Link } from 'react-router-dom'

const RenderPosts = ( {data, title}) => {
  if(data.length >0){
    return data.map((post, index) => {
      <Card key={post_id} {...post}/>
    })
  }
  
  return(
    <h2 className='font-bold text-accent text-xl'>
      {title}
    </h2>
  )
}

const Home = () => {

  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('Hello')

  return (
    <section className='flex flex-col gap-32  '>
      <div className='max-w-2xl flex flex-col items-center gap-10 py-20 self-center'>
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

      <div className='w-full flex flex-col '>

        <h1 className='w-full font-inter text-2xl font-bold  text-gray-800'>
          Look what the Community has been upto
        </h1>
        <p className='text-lg mb-20  '>
          A collection of high quality and imaginitive images created by Dall-E AI
        </p>

        <div className='mb-10'>
          <FormField />
        </div>

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

              <div className='flex flex-wrap'>
                {searchTerm ?
                (
                  <RenderPosts
                    data={[]}
                    title={'NO POSTS FOUND'}
                    />
                ):(
                  <RenderPosts
                    data="allPosts"
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
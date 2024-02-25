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


const Community = () => {

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
    <div className='w-full flex flex-col max-container mt-32'>

    <h1 className='font-playfair text-6xl font-bold  text-gray-800'>
      Posts from the Community
    </h1>
    <p className='text-lg mb-10  '>
      Take a look at what others are creating and get inspired to create your own
    </p>

    <div className='mb-10 max-w-lg '>
      <FormField
      placeholder={'Search'} />
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
  )
}

export default Community
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
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

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

  const handleSearchChange = (e) => {
 
    setSearchTerm(e.target.value);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
  
        const searchResults = posts.filter((item) => {
          return (
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.prompt.toLowerCase().includes(e.target.value.toLowerCase())
          );
        });
        setLoading(false)

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <div className='w-full flex flex-col max-container mt-20 md:mt-32 text-gray-800 dark:text-white min-h-screen'>

    <h1 className='font-playfair leading-[80px] text-6xl max-md:leading-[50px] max-md:text-4xl font-bold   mb-10 max-md:mb-6'>
      Posts from the Community
    </h1>
    <p className='text-lg mb-10 max-md:text-md max-md:mb-4 '>
      Take a look at what others are creating and get inspired to create your own
    </p>

    <div className='mb-10 max-w-lg '>
      <FormField
   
      type='text'
      name="text"
      placeholder={'Search'}
      value={searchTerm}
      handleChange={handleSearchChange} />
    </div>

    <div className='text-xl font-inter'>
      {loading ?
      (
        <div className='flex justify-center '>
          <Loader />
        </div>
      ):(
        <>
          {searchTerm && (
            <h2 className='text-xl mb-10'>
              Search Results for "<span className='text-accent font-semibold text-xl '>
                {searchTerm}
              </span>"
            </h2>
          )}

          <div className='grid xs:grid-cols-2 lg:grid-cols-3 grid-cols-1  gap-4 '>
            {searchTerm ?
            (
              <RenderPosts
                data={searchedResults || [] && setLoading(true)}
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
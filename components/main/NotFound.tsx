import React from 'react'
import Head from 'next/head'
import Search from '../header/Search'

const NotFound = () => (
  <>
    <Head>
      <title>Post not found</title>
    </Head>
    <div className='post'>
      <h1 className='post__title text-center'>Sorry not found</h1>
      <div>
        <Search />
      </div>
      <p>back to home page</p>
    </div>
  </>
)

export default NotFound

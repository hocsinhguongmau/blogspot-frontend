import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Search from '@components/header/Search'

const NotFound = () => (
  <>
    <Head>
      <title>Post not found</title>
    </Head>
    <div className='md:w-2/3 mx-auto'>
      <h1 className='post__title'>Article not found</h1>
      <p className='mt-2'>
        Try your search again or search for something else.
      </p>
      <div className='mt-4'>
        <Search />
      </div>
      <div className='mt-8'>
        <Link href='/'>
          <a className='button'>Back to home page</a>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Search from '@components/header/Search'

const NotFound = () => (
  <>
    <Head>
      <title>Article not found</title>
    </Head>
    <div className='container'>
      <div className='notfound'>
        <h1 className='post__title'>Article not found</h1>
        <p className='notfound__description'>
          Try your search again or search for something else.
        </p>
        <div className='notfound__searchbox'>
          <Search />
        </div>
        <div className='notfound__button'>
          <Link href='/'>
            <a className='button'>Back to home page</a>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default NotFound

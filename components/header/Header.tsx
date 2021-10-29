import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Search from './Search'
import Social from './Social'
import Navigation from './Navigation'

export default function Header(): ReactElement {
  return (
    <header className='header'>
      <div className='header__top'>
        <Search />
        <Link href='/'>
          <a>
            <Image src='/images/logo.svg' alt='Logo' width={68} height={34} />
          </a>
        </Link>
        <Social />
      </div>
      <div className='header__bottom'>
        <Navigation />
      </div>
    </header>
  )
}

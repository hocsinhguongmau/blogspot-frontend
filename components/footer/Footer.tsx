import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Social from '../header/Social'
import { CategoryLinks, TagLinks } from '../Links'

export default function Footer(): ReactElement {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__col'>
          <Link href='/'>
            <a className='footer__logo'>
              <Image src='/images/logo.svg' alt='Logo' width={68} height={34} />
            </a>
          </Link>
          <ul className='footer_links'>
            <li>
              <Link href='/about'>
                <a>About us</a>
              </Link>
            </li>
          </ul>
          <div className='copy-rights'>
            &copy; Copyright 2021 1stWebDesigner <br /> Helping You Build a
            Better Web
          </div>
        </div>
        <div className='footer__col'>
          <h4 className='footer__title'>Categories</h4>
          <CategoryLinks start={0} end={5} />
        </div>
        <div className='footer__col'>
          <h4 className='footer__title'>Tags</h4>
          <TagLinks start={0} end={5} />
        </div>
        <div className='footer__col'>
          <h4 className='footer__title'>Contact Us</h4>
          <Social />
        </div>
      </div>
    </footer>
  )
}

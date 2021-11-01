import React, { ReactElement, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu'
import Link from 'next/link'
import Image from 'next/image'
interface Props {}

export default function Navigation({}: Props): ReactElement {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  return (
    <>
      {isDesktop ? (
        <div className='navigation'>
          <ul>
            <li>
              <Link href='/'>
                <a>ALL ARTICLES</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>COLLECTIONS</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>CSS</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>FREELANCE</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>INSPIRATION</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>JAVASCRIPT</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>LEARN</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>MARKETING</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>MOBILE UI</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>PHOTOSHOP</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>TYPOGRAPHY</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>UX DESIGN</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>WEB DESIGN</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>WORDPRESS</a>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className='navigation-mobile'>
          <button
            className='navigation-mobile__button'
            onClick={() => setOpenMenu(true)}>
            <GiHamburgerMenu />
          </button>
          <div
            className={`navigation-mobile__panel ${openMenu ? 'active' : ''}`}>
            <Link href='/'>
              <a>
                <Image src='/images/logo.svg' height={35} width={70} />
              </a>
            </Link>
            <button className='button-close' onClick={() => setOpenMenu(false)}>
              <CgClose />
            </button>
            <ul>
              <li>
                <Link href='/'>
                  <a>ALL ARTICLES</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>COLLECTIONS</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>CSS</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>FREELANCE</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>INSPIRATION</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>JAVASCRIPT</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>LEARN</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>MARKETING</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>MOBILE UI</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>PHOTOSHOP</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>TYPOGRAPHY</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>UX DESIGN</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>WEB DESIGN</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a>WORDPRESS</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

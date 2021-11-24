import React, { ReactElement, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu'
import Link from 'next/link'
import Image from 'next/image'
import { CategoryLinks, TagLinks } from '../Links'

export default function Navigation(): ReactElement {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  return (
    <>
      {isDesktop ? (
        <div className='navigation'>
          <CategoryLinks start={0} end={10} />
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
            <CategoryLinks start={0} end={10} />
          </div>
        </div>
      )}
    </>
  )
}

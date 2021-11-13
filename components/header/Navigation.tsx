import React, { ReactElement, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { CgClose } from '@react-icons/all-files/cg/CgClose'
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu'
import Link from 'next/link'
import Image from 'next/image'
import { getCategory } from '../../queries'
import { useQuery, UseQueryResult } from 'react-query'
import { categoryType } from '../../lib/interfaces/PostsType'

const Links = (): ReactElement => {
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<categoryType[], Error> = useQuery<categoryType[], Error>(
    'links',
    getCategory,
  )
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error?.message}</div>
  }

  return (
    <ul>
      {data?.map((link) => (
        <li key={link.slug}>
          <Link href={`/category/${link.slug}`}>
            <a>{link.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Navigation(): ReactElement {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  return (
    <>
      {isDesktop ? (
        <div className='navigation'>
          <Links />
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
            <Links />
          </div>
        </div>
      )}
    </>
  )
}

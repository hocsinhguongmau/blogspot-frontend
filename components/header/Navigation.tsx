import React, { ReactElement } from 'react'
import Link from 'next/link'
interface Props {}

export default function Navigation({}: Props): ReactElement {
  return (
    <ul className='navigation'>
      <li>
        <Link href=''>
          <a>ALL ARTICLES</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>COLLECTIONS</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>CSS</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>FREELANCE</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>INSPIRATION</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>JAVASCRIPT</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>LEARN</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>MARKETING</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>MOBILE UI</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>PHOTOSHOP</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>TYPOGRAPHY</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>UX DESIGN</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>WEB DESIGN</a>
        </Link>
      </li>
      <li>
        <Link href=''>
          <a>WORDPRESS</a>
        </Link>
      </li>
    </ul>
  )
}

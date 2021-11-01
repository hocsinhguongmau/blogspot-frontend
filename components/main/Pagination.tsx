import React, { ReactElement } from 'react'
import Link from 'next/link'
interface Props {}

export default function Pagination({}: Props): ReactElement {
  return (
    <div className='pagination'>
      <ul>
        <li className='active'>
          <Link href='/'>
            <a>1</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>2</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>3</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>4</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>5</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>6</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>7</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>Next</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>Last</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

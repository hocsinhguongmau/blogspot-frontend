import React, { ReactElement } from 'react'
import Link from 'next/link'

type Props = {
  currentPage: number
  numberOfPages: number
}

export default function Pagination({
  currentPage,
  numberOfPages,
}: Props): ReactElement {
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const prevPage = `/posts/page/${currentPage - 1}`
  const nextPage = `/posts/page/${currentPage + 1}`
  return (
    <div className='pagination'>
      <ul>
        {!isFirst && (
          <>
            <li>
              <Link href={`/posts/page/1`}>
                <a>First</a>
              </Link>
            </li>
            <li>
              <Link href={prevPage}>
                <a>Previous</a>
              </Link>
            </li>
          </>
        )}

        {Array.from({ length: 3 }, (_, i) => {
          console.log(i + 1)
          if (i + currentPage <= numberOfPages)
            return (
              <li
                key={i}
                className={currentPage + i === currentPage ? 'active' : ''}>
                <Link href={`/posts/page/${(currentPage + i).toString()}`}>
                  <a>{currentPage + i}</a>
                </Link>
              </li>
            )
        })}

        {!isLast && (
          <>
            <li>
              <Link href={nextPage}>
                <a>Next</a>
              </Link>
            </li>
            <li>
              <Link href={`/posts/page/${numberOfPages.toString()}`}>
                <a>Last</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

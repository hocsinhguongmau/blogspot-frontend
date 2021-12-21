import React, { ReactElement } from 'react';
import Link from 'next/link';

type Props = {
  currentPage: number;
  numberOfPosts: number;
  postsPerPage: number;
  maxPages: number;
  urlName: string;
  query?: string;
};

export default function Pagination({
  currentPage,
  numberOfPosts,
  postsPerPage,
  maxPages,
  urlName,
  query,
}: Props): ReactElement {
  let totalPages = Math.ceil(numberOfPosts / postsPerPage);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage: number, endPage: number;

  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  let prevPage, nextPage;
  if (query) {
    prevPage = `/${urlName}/page/${currentPage - 1}?q=${query}`;
    nextPage = `/${urlName}/page/${currentPage + 1}?q=${query}`;
  } else {
    prevPage = `/${urlName}/page/${currentPage - 1}`;
    nextPage = `/${urlName}/page/${currentPage + 1}`;
  }

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  return (
    <div className="pagination">
      {query ? (
        <ul>
          {!isFirst && (
            <>
              <li>
                <Link href={`/${urlName}?q=${query}`}>
                  <a>First</a>
                </Link>
              </li>
              {currentPage === 2 ? (
                <li>
                  <Link href={`/${urlName}?q=${query}`}>
                    <a>Previous</a>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={prevPage}>
                    <a>Previous</a>
                  </Link>
                </li>
              )}
            </>
          )}

          {pages.map((page) => {
            if (page === 1) {
              return (
                <li key={page} className={page === currentPage ? 'active' : ''}>
                  <Link href={`/${urlName}?q=${query}`}>
                    <a>{page}</a>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={page} className={page === currentPage ? 'active' : ''}>
                  <Link href={`/${urlName}/page/${page}/${query ? '?q=' + query : ''}`}>
                    <a>{page}</a>
                  </Link>
                </li>
              );
            }
          })}

          {!isLast && (
            <>
              <li>
                <Link href={nextPage}>
                  <a>Next</a>
                </Link>
              </li>
              <li>
                <Link href={`/search/page/${totalPages.toString()}/${query ? '?q=' + query : ''}`}>
                  <a>Last</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      ) : (
        <ul>
          {!isFirst && (
            <>
              <li>
                <Link href={`/${urlName}`}>
                  <a>First</a>
                </Link>
              </li>
              {currentPage === 2 ? (
                <li>
                  <Link href={`/${urlName}`}>
                    <a>Previous</a>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={prevPage}>
                    <a>Previous</a>
                  </Link>
                </li>
              )}
            </>
          )}

          {pages.map((page) => {
            if (page === 1) {
              return (
                <li key={page} className={page === currentPage ? 'active' : ''}>
                  <Link href={`/${urlName}`}>
                    <a>{page}</a>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={page} className={page === currentPage ? 'active' : ''}>
                  <Link href={`/${urlName}/page/${page}`}>
                    <a>{page}</a>
                  </Link>
                </li>
              );
            }
          })}

          {!isLast && (
            <>
              <li>
                <Link href={nextPage}>
                  <a>Next</a>
                </Link>
              </li>
              <li>
                <Link href={`/${urlName}/page/${totalPages.toString()}`}>
                  <a>Last</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

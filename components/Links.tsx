import React, { ReactElement } from 'react'
import Link from 'next/link'
import { useQuery, UseQueryResult } from 'react-query'
import { categoryType, tagType } from '../lib/interfaces/PostsType'
import { getCategory, getTag } from '../queries'
import Loading from './Loading'

type startEnd = {
  start: number
  end: number
}

export const TagLinks = ({ start, end }: startEnd): ReactElement => {
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<tagType[] | undefined, Error> = useQuery<
    tagType[] | undefined,
    Error
  >('taglinks', () => getTag(start, end))
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
          <Link href={`/tag/${link.slug}`}>
            <a>{link.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const CategoryLinks = ({ start, end }: startEnd): ReactElement => {
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<categoryType[] | undefined, Error> = useQuery<
    categoryType[] | undefined,
    Error
  >('categorylinks', () => getCategory(start, end))
  if (isLoading) {
    return <Loading />
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

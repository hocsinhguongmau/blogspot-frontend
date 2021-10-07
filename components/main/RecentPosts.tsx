import React, { ReactElement } from 'react'
import Link from 'next/link'
import Post from './Post'
interface Props {}

export default function RecentPosts({}: Props): ReactElement {
  return (
    <section className='recent-posts'>
      <div className='container'>
        <h2 className='recent-posts__title'>More recent articles</h2>
        <Link href=''>
          <a className='recent-posts__category'>All articles</a>
        </Link>
        <div className='recent-posts__wrapper'>
          <Post classes='recent-posts__item' size={[150, 100]} />
          <Post classes='recent-posts__item' size={[150, 100]} />
          <Post classes='recent-posts__item' size={[150, 100]} />
          <Post classes='recent-posts__item' size={[150, 100]} />
          <Post classes='recent-posts__item' size={[150, 100]} />
          <Post classes='recent-posts__item' size={[150, 100]} />
          <Post classes='recent-posts__item' size={[150, 100]} />
          <Post classes='recent-posts__item' size={[150, 100]} />
        </div>
        <button className='button'>View more article</button>
      </div>
    </section>
  )
}

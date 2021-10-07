import React, { ReactElement } from 'react'
import Post from './Post'
interface Props {}

export default function PopularPosts({}: Props): ReactElement {
  return (
    <section className='popular-posts'>
      <div className='container'>
        <div className='popular-posts__col'>
          <h2 className='popular-posts__title'>Popular Posts</h2>
          <p className='popular-posts__description'>
            The most popular posts on 1st Web Designer.
          </p>
          <Post classes='popular-post' size={[150, 100]} />
        </div>
        <div className='popular-posts__col'>
          <Post classes='recent-post' size={[100, 100]} />
          <Post classes='recent-post' size={[100, 100]} />
          <Post classes='recent-post' size={[100, 100]} />
        </div>
      </div>
    </section>
  )
}

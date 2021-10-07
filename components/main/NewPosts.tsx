import React, { ReactElement } from 'react'
import Post from './Post'
interface Props {}

export default function NewPosts({}: Props): ReactElement {
  return (
    <section className='new-posts'>
      <div className='container'>
        <div className='new-posts__col'>
          <Post classes='latest-post' size={[200, 100]} />
        </div>
        <div className='new-posts__col'>
          <Post classes='recent-post' size={[100, 100]} />
          <Post classes='recent-post' size={[100, 100]} />
          <Post classes='recent-post' size={[100, 100]} />
        </div>
      </div>
    </section>
  )
}

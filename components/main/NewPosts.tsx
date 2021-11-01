import React, { ReactElement } from 'react'
import Post from './Post'
import { InitialDataProps } from '../../pages'

export default function NewPosts({ posts }: InitialDataProps): ReactElement {
  return (
    <section className='new-posts'>
      <div className='container'>
        <div className='new-posts__col'>
          <Post classes='latest-post' size={[200, 100]} post={posts[0]} />
        </div>
        <div className='new-posts__col'>
          {posts.slice(1).map((post) => (
            <Post
              key={post.id}
              classes='recent-post'
              size={[200, 150]}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import React, { ReactElement } from 'react'
import { PostType } from '../../lib/interfaces/PostsType'
import Post from './Post'

type AppProps = {
  posts: PostType[]
}

export default function PopularPosts({ posts }: AppProps): ReactElement {
  console.log(posts)
  return (
    <section className='popular-posts'>
      <div className='container'>
        <div className='popular-posts__col'>
          <h2 className='popular-posts__title'>Popular Posts</h2>
          <p className='popular-posts__description'>
            The most popular posts on 1st Web Designer.
          </p>
          <Post post={posts[0]} classes='popular-post' size={[150, 100]} />
        </div>
        <div className='popular-posts__col'>
          {posts.slice(1).map((post: PostType) => (
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

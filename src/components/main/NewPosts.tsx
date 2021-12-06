import React, { ReactElement } from 'react'
import { PostType } from '@lib/interfaces/PostsType'
import Post from '@components/main/Post'

type AppProps = {
  posts: PostType[]
}

export default function NewPosts({ posts }: AppProps): ReactElement {
  return (
    <section className='new-posts'>
      <div className='container'>
        <div className='new-posts__col'>
          <Post classes='latest-post' size={[200, 100]} post={posts[0]} />
        </div>
        <div className='new-posts__col'>
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

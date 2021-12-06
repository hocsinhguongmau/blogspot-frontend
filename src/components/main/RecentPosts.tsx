import React, { ReactElement } from 'react'
import Link from 'next/link'
import Post from '@components/main/Post'
import { PostType } from '@lib/interfaces/PostsType'

type AppProps = {
  posts: PostType[]
}

export default function RecentPosts({ posts }: AppProps): ReactElement {
  return (
    <section className='recent-posts'>
      <div className='container'>
        <h2 className='recent-posts__title'>More recent articles</h2>
        <Link href='/'>
          <a className='recent-posts__category'>All articles</a>
        </Link>
        <div className='recent-posts__wrapper'>
          {posts.map((post: PostType) => (
            <Post
              key={post.id}
              classes='recent-posts__item'
              size={[150, 100]}
              post={post}
            />
          ))}
        </div>
        <div className='text-center'>
          <Link href='/posts'>
            <a className='button'>View more article</a>
          </Link>
        </div>
      </div>
    </section>
  )
}

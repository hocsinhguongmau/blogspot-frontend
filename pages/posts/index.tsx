import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useQuery, UseQueryResult } from 'react-query'
import { PostType } from '../../lib/interfaces/PostsType'
import { getAllPosts } from '../../queries'
import Post from '../../components/main/Post'
import Pagination from '../../components/main/Pagination'

interface Props {
  posts: {
    allPosts: PostType[]
    statics: {
      numberOfPosts: number
    }
  }
}

const postsPerPage = 4
const page = '1'

const PostPage = ({ posts }: Props) => {
  const numberOfPosts = posts.statics.numberOfPosts
  const {
    isLoading,
    isError,
    error,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >('posts', () => getAllPosts(0, postsPerPage), {
    keepPreviousData: true,
    initialData: posts.allPosts,
  })

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <p>{error?.message}</p>
      </div>
    )
  }
  if (posts.allPosts.length) {
    return (
      <>
        <Head>
          <title>
            {numberOfPosts > postsPerPage ? `Posts page ${page}` : 'Post'}
          </title>
        </Head>
        <div className='posts'>
          <div className='container'>
            <div className='posts__wrapper'>
              {posts.allPosts.map((post: PostType) => (
                <Post
                  classes='posts__item'
                  key={post.title}
                  post={post}
                  button={true}
                  size={[150, 100]}
                />
              ))}
            </div>
            {typeof page === 'string' && numberOfPosts > postsPerPage ? (
              <Pagination
                currentPage={parseInt(page)}
                numberOfPosts={numberOfPosts}
                postsPerPage={postsPerPage}
                maxPages={5}
                urlName={'posts'}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </>
    )
  } else {
    return <div>No posts found</div>
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(0, postsPerPage)
  return { props: { posts } }
}

export default PostPage

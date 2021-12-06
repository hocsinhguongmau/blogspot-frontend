import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useQuery, UseQueryResult } from 'react-query'
import { PostType } from '@lib/interfaces/PostsType'
import { getAllPosts } from 'queries'
import Post from '@components/main/Post'
import Pagination from '@components/main/Pagination'
import NotFound from '@components/main/NotFound'
import Loading from '@components/Loading'

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
    data,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >(['allPosts', 1], () => getAllPosts(0, postsPerPage), {
    initialData: posts.allPosts,
  })

  if (isLoading) {
    return (
      <div>
        <Loading />
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
  if (data) {
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
              {data.map((post: PostType) => (
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
    return <NotFound />
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(0, postsPerPage)
  return { props: { posts } }
}

export default PostPage

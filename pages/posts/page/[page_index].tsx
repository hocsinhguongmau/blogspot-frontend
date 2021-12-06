import React from 'react'
import Head from 'next/head'
import Post from '@components/main/Post'
import { PostType } from '@lib/interfaces/PostsType'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Pagination from '@components/main/Pagination'
import { getAllPosts } from 'queries'
import { useRouter } from 'next/dist/client/router'
import { useQuery, UseQueryResult } from 'react-query'
import Loading from '@components/Loading'
import NotFound from '@components/main/NotFound'

interface Props {
  posts: {
    allPosts: PostType[]
    statics: {
      numberOfPosts: number
    }
  }
}

const postsPerPage = 4
let start: number,
  end: number = 0

const PostPage = ({ posts }: Props) => {
  const router = useRouter()
  const page: string | string[] | undefined = router.query.page_index

  if (typeof page === 'string') {
    start = (parseInt(page) - 1) * postsPerPage
    end = parseInt(page) * postsPerPage - 1
  }
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >(['allPosts', page], () => getAllPosts(start, end), {
    initialData: posts.allPosts,
  })

  if (isLoading) {
    return <Loading />
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
          <title>Posts page {page}</title>
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
            {typeof page === 'string' ? (
              <Pagination
                currentPage={parseInt(page)}
                numberOfPosts={posts.statics.numberOfPosts}
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const page: string | string[] | undefined = query.page_index

  if (typeof page === 'string') {
    start = (parseInt(page) - 1) * postsPerPage
    end = parseInt(page) * postsPerPage
  }
  const posts = await getAllPosts(start, end)
  return { props: { posts: posts } }
}

export default PostPage

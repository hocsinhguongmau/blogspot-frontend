import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { PostType } from '../../lib/interfaces/PostsType'
import { searchByQuery } from '../../queries'
import Post from '../../components/main/Post'
import Pagination from '../../components/main/Pagination'

interface Props {
  posts: {
    posts: PostType[]
    statics: {
      numberOfPosts: number
    }
  }
}

const postsPerPage = 4
const page = '1'
export default function SearchPage({ posts }: Props) {
  const router = useRouter()
  const search = router.query.q
  const {
    isLoading,
    isError,
    error,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >('posts', () => searchByQuery(search, 0, postsPerPage), {
    initialData: posts.posts,
    keepPreviousData: true,
  })
  const numberOfPosts = posts.statics.numberOfPosts
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

  if (posts.posts.length === 0) {
    return <>No post found for "{search}"</>
  } else {
    return (
      <>
        <Head>
          <title>search</title>
        </Head>
        <div className='posts'>
          <div className='container'>
            <div className='posts__wrapper'>
              {posts.posts.map((post: PostType) => (
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
  }
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const posts = await searchByQuery(query?.q, 0, postsPerPage)
  return { props: { posts: posts } }
}

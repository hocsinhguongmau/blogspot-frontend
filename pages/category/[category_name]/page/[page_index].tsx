import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, UseQueryResult } from 'react-query'
import { getPostsByCategory } from '../../../../queries'
import Pagination from '../../../../components/main/Pagination'
import Post from '../../../../components/main/Post'
import { PostType } from '../../../../lib/interfaces/PostsType'
import Loading from '../../../../components/Loading'
import NotFound from '../../../../components/main/NotFound'

const postsPerPage = 4
interface Props {
  posts: {
    posts: PostType[]
    statics: {
      numberOfPosts: number
    }
  }
}

let start: number,
  end: number = 0

const CategoryPage = ({ posts }: Props) => {
  const router = useRouter()
  const category = router.query.category_name
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
  >(['postsByCategory', page], () => getPostsByCategory(category, start, end), {
    keepPreviousData: true,
    initialData: posts.posts,
  })
  const numberOfPosts = posts.statics.numberOfPosts
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

  if (!data) {
    return (
      <>
        <NotFound />
      </>
    )
  } else {
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
                urlName={
                  typeof category === 'string' ? `category/${category}` : ''
                }
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
  const page: string | string[] | undefined = query.page_index
  if (typeof page === 'string') {
    start = (parseInt(page) - 1) * postsPerPage
    end = parseInt(page) * postsPerPage
  }
  const posts = await getPostsByCategory(query?.category_name, start, end)

  return { props: { posts: posts } }
}

export default CategoryPage

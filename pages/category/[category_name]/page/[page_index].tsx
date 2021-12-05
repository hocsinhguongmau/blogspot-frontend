import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
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
  const queryClient = useQueryClient()
  const router = useRouter()
  const category = router.query.category_name
  const page: number = parseInt(router.query.page_index as string)

  start = (page - 1) * postsPerPage
  end = page * postsPerPage - 1
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >(
    [`postsByCategory_${category}`, page],
    () => getPostsByCategory(category, start, end),
    {
      initialData: posts.posts,
    },
  )
  const numberOfPosts = posts.statics.numberOfPosts

  useEffect(() => {
    if (numberOfPosts && postsPerPage * page < numberOfPosts) {
      queryClient.prefetchQuery<PostType[] | undefined, Error>(
        [`postsByCategory_${category}`, page + 1],
        () =>
          getPostsByCategory(
            category,
            page * postsPerPage,
            (page + 1) * postsPerPage,
          ),
      )
    }
  }, [data, page, queryClient])
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
            {numberOfPosts > postsPerPage ? (
              <Pagination
                currentPage={page}
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
  const page: number = parseInt(query.page_index as string)
  start = (page - 1) * postsPerPage
  end = page * postsPerPage
  const posts = await getPostsByCategory(query?.category_name, start, end)

  return { props: { posts: posts } }
}

export default CategoryPage

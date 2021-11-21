import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, UseQueryResult } from 'react-query'
import { PostType } from '../../../lib/interfaces/PostsType'
import { getCategory, getPostsByCategory } from '../../../queries'
import Post from '../../../components/main/Post'
import Pagination from '../../../components/main/Pagination'

const postsPerPage = 4
const page = '1'
interface Props {
  posts?: {
    posts: PostType[]
    statics: {
      numberOfPosts: number
    }
  }
}

const CategoryPage = ({ posts }: Props) => {
  const router = useRouter()
  const category = router.query.category_name
  const {
    isLoading,
    isError,
    error,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >('posts', () => getPostsByCategory(category, 0, postsPerPage), {
    keepPreviousData: true,
    initialData: posts?.posts,
  })
  const numberOfPosts = posts?.statics.numberOfPosts
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

  if (!posts) {
    return <>No post found for {category}</>
  } else {
    return (
      <>
        <Head>
          <title>
            {numberOfPosts! > postsPerPage ? `Posts page ${page}` : 'Post'}
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
            {typeof page === 'string' && numberOfPosts! > postsPerPage ? (
              <Pagination
                currentPage={parseInt(page)}
                numberOfPosts={numberOfPosts!}
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

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const posts = await getPostsByCategory(params?.category_name, 0, postsPerPage)

  return { props: { posts: posts } }
}

export const getStaticPaths = async () => {
  const categories = await getCategory()
  const paths = categories.map((category) => ({
    params: {
      category_name: category.slug,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}

export default CategoryPage

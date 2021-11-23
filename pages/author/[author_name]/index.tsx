import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, UseQueryResult } from 'react-query'
import { authorType, PostType } from '../../../lib/interfaces/PostsType'
import { getAuthor, getPostsByAuthor } from '../../../queries'
import Post from '../../../components/main/Post'
import Pagination from '../../../components/main/Pagination'
import NotFound from '../../../components/main/NotFound'
import Loading from '../../../components/Loading'

const postsPerPage = 4
const page = '1'

interface Props {
  posts: {
    author: authorType
    posts: PostType[]
    statics: {
      numberOfPosts: number
    }
  }
}

const AuthorPage = ({ posts }: Props) => {
  const router = useRouter()
  const author = router.query.author_name
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >(['postsByAuthor', 1], () => getPostsByAuthor(author, 0, postsPerPage), {
    keepPreviousData: true,
    initialData: posts?.posts,
  })
  const numberOfPosts = posts?.statics.numberOfPosts
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
            {numberOfPosts! > postsPerPage ? `Posts page ${page}` : 'Post'}
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
            {typeof page === 'string' && numberOfPosts! > postsPerPage ? (
              <Pagination
                currentPage={parseInt(page)}
                numberOfPosts={numberOfPosts!}
                postsPerPage={postsPerPage}
                maxPages={5}
                urlName={typeof author === 'string' ? `author/${author}` : ''}
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
  const posts = await getPostsByAuthor(params?.author_name, 0, postsPerPage)

  return { props: { posts: posts } }
}

export const getStaticPaths = async () => {
  const authors = await getAuthor()
  const paths = authors.map((author) => ({
    params: {
      author_name: author.slug,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}

export default AuthorPage

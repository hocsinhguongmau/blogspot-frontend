import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, UseQueryResult } from 'react-query'
import { AuthorPageType, authorType, PostType } from '@lib/interfaces/PostsType'
import { getAuthor, getPostsByAuthor } from 'queries'
import Post from '@components/main/Post'
import Pagination from '@components/main/Pagination'
import NotFound from '@components/main/NotFound'
import Loading from '@components/Loading'
import PostTitle from '@components/PostTitle'

const postsPerPage = 4
const page = '1'

const AuthorPage = (props: AuthorPageType) => {
  const router = useRouter()
  const author = router.query.author_name as string
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<AuthorPageType | undefined, Error> = useQuery<
    AuthorPageType | undefined,
    Error
  >(
    [`postsByAuthor_${author}`, 1],
    () => getPostsByAuthor(author, 0, postsPerPage),
    {
      initialData: props,
    },
  )

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
    console.log(data)
    const numberOfPosts = data.numberOfPosts
    return (
      <>
        <Head>
          <title>Posts by {data.author.name}</title>
        </Head>
        <div className='posts'>
          <div className='container'>
            <PostTitle author={true} string={data.author.name} />
            <div className='posts__wrapper'>
              {data.posts.map((post: PostType) => (
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
                currentPage={parseInt(page)}
                numberOfPosts={numberOfPosts!}
                postsPerPage={postsPerPage}
                maxPages={5}
                urlName={`author/${author}`}
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
  const data = await getPostsByAuthor(
    params?.author_name as string,
    0,
    postsPerPage,
  )
  if (!data) {
    return {
      notFound: true,
    }
  }
  return { props: data }
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
    fallback: false,
  }
}

export default AuthorPage

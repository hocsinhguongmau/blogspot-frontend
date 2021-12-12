import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { PostPageType, PostType } from '@lib/interfaces/PostsType'
import { searchByQuery } from 'queries'
import Post from '@components/main/Post'
import Pagination from '@components/main/Pagination'
import Loading from '@components/Loading'
import NotFound from '@components/main/NotFound'

const postsPerPage = 4
const page = '1'

export default function SearchPage(props: PostPageType) {
  const router = useRouter()
  const search = router.query.q as string
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<PostPageType | undefined, Error> = useQuery<
    PostPageType | undefined,
    Error
  >([`search_${search}`, 1], () => searchByQuery(search, 0, postsPerPage), {
    initialData: props,
  })
  const numberOfPosts = props.numberOfPosts
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

  if (data && data.posts.length > 0) {
    return (
      <>
        <Head>
          <title>Search for {search}</title>
        </Head>
        <div className='posts'>
          <div className='container'>
            <h1 className='text-center text-2xl font-bold'>
              Search for "{search}"
            </h1>
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
                numberOfPosts={numberOfPosts}
                postsPerPage={postsPerPage}
                maxPages={5}
                urlName={`search`}
                query={search}
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
  const data = await searchByQuery(query?.q as string, 0, postsPerPage)
  if (!data?.posts.length) {
    return {
      notFound: true,
    }
  }
  return { props: data }
}

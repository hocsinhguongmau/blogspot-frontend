import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { getPostsByCategory } from 'queries'
import { PostPageType, PostType } from '@lib/interfaces/PostsType'
import Loading from '@components/Loading'
import NotFound from '@components/main/NotFound'
import Pagination from '@components/main/Pagination'
import Post from '@components/main/Post'
import PostTitle from '@components/PostTitle'

const postsPerPage = 4

let start: number,
  end: number = 0

const CategoryPage = (props: PostPageType) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const category = router.query.category_name as string
  const page: number = parseInt(router.query.page_index as string)

  start = (page - 1) * postsPerPage
  end = page * postsPerPage - 1
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<PostPageType | undefined, Error> = useQuery<
    PostPageType | undefined,
    Error
  >(
    [`postsByCategory_${category}`, page],
    () => getPostsByCategory(category, start, end),
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
    const numberOfPosts = data.numberOfPosts

    useEffect(() => {
      if (numberOfPosts && postsPerPage * page < numberOfPosts) {
        queryClient.prefetchQuery<PostPageType | undefined, Error>(
          [`postsByCategory_${category}`, page + 1],
          () =>
            getPostsByCategory(
              category as string,
              page * postsPerPage,
              (page + 1) * postsPerPage,
            ),
        )
      }
    }, [data, page, queryClient])

    return (
      <>
        <Head>
          <title>Posts in {data.title?.title}</title>
        </Head>
        <div className='posts'>
          <div className='container'>
            <PostTitle string={data.title?.title} />
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
                currentPage={page}
                numberOfPosts={numberOfPosts}
                postsPerPage={postsPerPage}
                maxPages={5}
                urlName={`category/${category}`}
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
  const data = await getPostsByCategory(
    query?.category_name as string,
    start,
    end,
  )
  console.log(data?.posts.length)
  if (!data?.posts.length) {
    return {
      notFound: true,
    }
  }
  return { props: data }
}

export default CategoryPage

import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { PostPageType, PostType } from '@lib/interfaces/PostsType'
import { getCategory, getPostsByCategory } from 'queries'
import Post from '@components/main/Post'
import Pagination from '@components/main/Pagination'
import Loading from '@components/Loading'
import NotFound from '@components/main/NotFound'
import PostTitle from '@components/PostTitle'

const postsPerPage = 4
const page = 1

const CategoryPage = (props: PostPageType) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const category = router.query.category_name as string
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
    () => getPostsByCategory(category, 0, postsPerPage),
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
              category,
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
                numberOfPosts={numberOfPosts!}
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

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const query = params?.category_name as string
  const data = await getPostsByCategory(query, 0, postsPerPage)
  if (!data) {
    return {
      notFound: true,
    }
  }
  return { props: data }
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
    fallback: false,
  }
}

export default CategoryPage

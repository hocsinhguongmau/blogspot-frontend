import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useQuery, UseQueryResult } from 'react-query'
import { PostType } from '../../lib/interfaces/PostsType'
import { getAllPosts } from '../../queries'
import Post from '../../components/main/Post'
import Pagination from '../../components/main/Pagination'

interface Props {
  posts: {
    allPosts: PostType[]
    statics: {
      numberOfPosts: number
    }
  }
}

const postsPerPage = 4
const page = '1'

const PostPage = ({ posts }: Props) => {
  const {
    isLoading,
    isError,
    error,
  }: UseQueryResult<PostType[] | undefined, Error> = useQuery<
    PostType[] | undefined,
    Error
  >('posts', () => getAllPosts(0, postsPerPage), {
    keepPreviousData: true,
    initialData: posts.allPosts,
  })

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
  if (posts.allPosts.length) {
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
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </>
    )
  } else {
    return <div>No posts found</div>
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(0, postsPerPage)
  return { props: { posts } }
}

// export const getServerSideProps: GetServerSideProps = async ({
//   query,
// }: GetServerSidePropsContext) => {
//   const page: string | string[] | undefined = query.page_index

//   if (typeof page === 'string') {
//     start = (parseInt(page) - 1) * postsPerPage
//     end = parseInt(page) * postsPerPage
//   }
//   const posts = await getAllPosts(start, end)
//   return { props: { posts } }
// }

export default PostPage

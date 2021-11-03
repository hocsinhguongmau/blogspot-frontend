import React, { ReactElement } from 'react'
import Link from 'next/link'
const BlockContent = require('@sanity/block-content-to-react')
import Post from '../../components/main/Post'
import { GetStaticPaths, GetStaticProps } from 'next'
import { configuredSanityClient, getSinglePost } from '../../queries'
import { useQuery, UseQueryResult } from 'react-query'
import { PostType } from '../../lib/interfaces/PostsType'
import { useRouter } from 'next/dist/client/router'
import { useNextSanityImage } from 'next-sanity-image'

interface AppProps {
  post: PostType | undefined
}

const PostPage = ({ post }: AppProps) => {
  const router = useRouter()
  const slug = router.query.slug
  const {
    isLoading,
    isError,
    error,
  }: UseQueryResult<PostType | undefined, Error> = useQuery<
    PostType | undefined,
    Error
  >('post', () => getSinglePost(slug), {
    initialData: post,
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

  if (post) {
    const imageProps = useNextSanityImage(configuredSanityClient, post.imageUrl)
    return (
      <div className='post'>
        <div
          className='breadcrumbs'
          style={{ backgroundImage: `url('${imageProps.src}')` }}>
          <div className='breadcrumbs__content'>
            <p>
              <span className='post__category'>
                {post.categories.map((category) => (
                  <Link
                    href={`/categories/${category.slug}`}
                    key={category.slug}>
                    <a>{category.title}</a>
                  </Link>
                ))}
              </span>
              <span className='post__tag'>
                {post.tags.map((tag) => (
                  <Link href={`/tags/${tag.slug}`} key={tag.slug}>
                    <a>{tag.title}</a>
                  </Link>
                ))}
              </span>
            </p>
            <h1 className='post__title'>{post.title}</h1>
            <p className='post__date'>
              {post.createdAt.slice(0, 10).toUpperCase()} |
              <Link href={`/author/${post.author.slug}`}>
                <a>{post.author.name.toUpperCase()}</a>
              </Link>
            </p>
          </div>
        </div>
        <div className='container'>
          <article className='post__content'>
            <BlockContent
              blocks={post.body}
              imageOptions={{ w: 320, h: 240, fit: 'max' }}
              projectId={process.env.NEXT_PUBLIC_PROJECT_ID}
              dataset={process.env.NEXT_PUBLIC_DATASET}
            />
          </article>
        </div>
        <section className='recent-posts'>
          <div className='container'>
            <h2 className='recent-posts__title'>Related posts</h2>
            <div className='recent-posts__wrapper'>
              {/* <Post classes='recent-posts__item' size={[150, 100]} />
            <Post classes='recent-posts__item' size={[150, 100]} />
            <Post classes='recent-posts__item' size={[150, 100]} />
            <Post classes='recent-posts__item' size={[150, 100]} /> */}
            </div>
          </div>
        </section>
      </div>
    )
  } else {
    return 'Hmm'
  }
}

type slugType = {
  params: {
    slug: string
  }
}
export const getStaticProps = async ({
  params,
}: slugType): Promise<{
  props: { post: PostType | undefined }
}> => {
  const post = await getSinglePost(params.slug)
  return { props: { post: post } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export default PostPage

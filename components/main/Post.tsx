import React, { ReactElement } from 'react'
import sanityClient from '@sanity/client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import Link from 'next/link'
import { PostType } from '../../lib/interfaces/PostsType'

const configuredSanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  useCdn: true,
})

interface Props {
  classes: string
  size: [number, number]
  button?: boolean
  post: PostType
}

export default function Post({
  classes,
  size,
  button,
  post,
}: Props): ReactElement {
  const imageProps = useNextSanityImage(configuredSanityClient, post.imageUrl)
  return (
    <div className={classes}>
      <div className={`${classes}__image`}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <Image
              {...imageProps}
              height={size[1]}
              width={size[0]}
              layout='responsive'
            />
          </a>
        </Link>
      </div>
      <div className={`${classes}__text`}>
        <p className={`${classes}__tag`}>
          {post.categories.map((category) => (
            <span key={category.slug}>
              <Link href={`/categories/${category.slug}`}>
                <a>{category.title}</a>
              </Link>
            </span>
          ))}
        </p>
        <h4 className={`${classes}__title`}>
          <Link href={`/post/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h4>
        <p className={`${classes}__description`}>
          There’s nothing as satisfying as ending the day feeling accomplished
          in all that you had planned to do. It may not be practical to have…
        </p>
      </div>
      {button ? (
        <Link href='/posts'>
          <a className='button'>Read more</a>
        </Link>
      ) : null}
    </div>
  )
}

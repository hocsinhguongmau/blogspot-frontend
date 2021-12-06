import React, { ReactElement } from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import Link from 'next/link'
import { PostType, RelatedPostType } from '@lib/interfaces/PostsType'
import { client } from 'queries'

interface Props {
  classes: string
  size: [number, number]
  post: RelatedPostType
}

export default function Post({ classes, size, post }: Props): ReactElement {
  const imageProps = useNextSanityImage(client, post.imageUrl)

  return (
    <div className={classes}>
      <div className={`${classes}__image`}>
        <Link href={`/posts/${post.slug}`}>
          <a>
            <Image
              {...imageProps}
              height={size[1]}
              width={size[0]}
              layout='responsive'
              alt={post.title}
            />
          </a>
        </Link>
      </div>
      <div className={`${classes}__text`}>
        <h4 className={`${classes}__title`}>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h4>
      </div>
    </div>
  )
}

import React, { ReactElement } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { client } from 'queries';
import { PostType } from '@lib/interfaces/PostsType';

interface Props {
  classes: string;
  size: [number, number];
  button?: boolean;
  post: PostType;
}

export default function Post({ classes, size, button, post }: Props): ReactElement {
  const imageProps = useNextSanityImage(client, post.imageUrl);

  return (
    <div className={classes}>
      <div className={`${classes}__image`}>
        <Link href={`/posts/${post.slug}`}>
          <a>
            <Image {...imageProps} height={size[1]} width={size[0]} layout="responsive" alt={post.title} />
          </a>
        </Link>
      </div>
      <div className={`${classes}__text`}>
        <p className={`${classes}__tag`}>
          {post.tags?.map((tag?) => (
            <span key={tag.slug}>
              <Link href={`/tag/${tag.slug}`}>
                <a>{tag.title}</a>
              </Link>
            </span>
          ))}
        </p>
        <h4 className={`${classes}__title`}>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h4>
        <p className={`${classes}__description`}>{post.description}</p>
      </div>
      {button ? (
        <Link href={`/posts/${post.slug}`}>
          <a className="button">Read more</a>
        </Link>
      ) : null}
    </div>
  );
}

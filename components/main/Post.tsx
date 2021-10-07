import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  classes: string
  size: [number, number]
  button?: boolean
}

export default function Post({ classes, size, button }: Props): ReactElement {
  return (
    <div className={classes}>
      <div className={`${classes}__image`}>
        <Link href=''>
          <a>
            <Image
              src='/images/logo.svg'
              height={size[1]}
              width={size[0]}
              layout='responsive'
            />
          </a>
        </Link>
      </div>
      <div className={`${classes}__text`}>
        <p className={`${classes}__tag`}>
          <Link href=''>
            <a>wordpress</a>
          </Link>
        </p>
        <h4 className={`${classes}__title`}>
          <Link href=''>
            <a>Top Free &amp; Premium WordPress Calendar Plugins</a>
          </Link>
        </h4>
        <p className={`${classes}__description`}>
          There’s nothing as satisfying as ending the day feeling accomplished
          in all that you had planned to do. It may not be practical to have…
        </p>
      </div>
      {button ? (
        <Link href=''>
          <a className='button'>Read more</a>
        </Link>
      ) : null}
    </div>
  )
}

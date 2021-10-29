import React, { ReactElement } from 'react'
import Link from 'next/link'
import Post from '../../components/main/Post'
interface Props {}

export default function index({}: Props): ReactElement {
  return (
    <div className='post'>
      <div
        className='breadcrumbs'
        style={{ backgroundImage: `url('/images/logo.svg')` }}>
        <div className='breadcrumbs__content'>
          <p>
            <span className='post__category'>
              <Link href=''>
                <a>Web design</a>
              </Link>
            </span>
            <span className='post__tag'>
              <Link href=''>
                <a>#Web design</a>
              </Link>
            </span>
            <span className='post__tag'>
              <Link href=''>
                <a>#Web design</a>
              </Link>
            </span>
          </p>
          <h1 className='post__title'>
            This Week In Web Design – September 24, 2021
          </h1>
          <p className='post__date'>
            SEPTEMBER 24, 2021 |{' '}
            <Link href=''>
              <a>EDITORIAL TEAM</a>
            </Link>
          </p>
        </div>
      </div>
      <div className='container'>
        <article className='post__content'>
          This article was originally posted at
          https://medium.com/@christinatruong/the-text-shadow-css-property-d1064bb1b27d
          and was kindly shared by Christina Truong. Check out more of her work
          at https://christinatruong.com. In the early days of web development,
          it wasn’t uncommon for one person to do everything. The job title was
          often referred to as “webmaster,” “web designer,” or “web developer.”
          These days, there is often more specialization because the web has
          become so much more advanced. The different areas of focus are{' '}
        </article>
      </div>
      <section className='recent-posts'>
        <div className='container'>
          <h2 className='recent-posts__title'>Related posts</h2>
          <div className='recent-posts__wrapper'>
            <Post classes='recent-posts__item' size={[150, 100]} />
            <Post classes='recent-posts__item' size={[150, 100]} />
            <Post classes='recent-posts__item' size={[150, 100]} />
            <Post classes='recent-posts__item' size={[150, 100]} />
          </div>
        </div>
      </section>
    </div>
  )
}

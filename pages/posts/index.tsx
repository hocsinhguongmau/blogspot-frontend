import React from 'react'
import Post from '../../components/main/Post'
import Pagination from '../../components/main/Pagination'
import { PostType } from '../../lib/interfaces/PostsType'
import { getSinglePost } from '../../queries'
import { GetStaticPaths } from 'next'
interface Props {}

const PostPage = (props: Props) => {
  return (
    <div className='posts'>
      <h2 className='posts__title'>Search Results for: Hmm</h2>
      <div className='container'>
        <div className='posts__wrapper'>
          {/* <Post classes='posts__item' button={true} size={[150, 100]} />
      <Post classes='posts__item' button={true} size={[150, 100]} />
      <Post classes='posts__item' button={true} size={[150, 100]} />
      <Post classes='posts__item' button={true} size={[150, 100]} />
      <Post classes='posts__item' button={true} size={[150, 100]} />
      <Post classes='posts__item' button={true} size={[150, 100]} />
      <Post classes='posts__item' button={true} size={[150, 100]} />
      <Post classes='posts__item' button={true} size={[150, 100]} /> */}
        </div>
        <Pagination />
      </div>
    </div>
  )
}

export default PostPage

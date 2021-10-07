import React, { ReactElement } from 'react'
import Pagination from './Pagination'
import Post from './Post'

interface Props {}

export default function List({}: Props): ReactElement {
  return (
    <div className='posts'>
      <h2 className='posts__title'>Search Results for: Hmm</h2>
      <div className='container'>
        <div className='posts__wrapper'>
          <Post classes='posts__item' button={true} size={[150, 100]} />
          <Post classes='posts__item' button={true} size={[150, 100]} />
          <Post classes='posts__item' button={true} size={[150, 100]} />
          <Post classes='posts__item' button={true} size={[150, 100]} />
          <Post classes='posts__item' button={true} size={[150, 100]} />
          <Post classes='posts__item' button={true} size={[150, 100]} />
          <Post classes='posts__item' button={true} size={[150, 100]} />
          <Post classes='posts__item' button={true} size={[150, 100]} />
        </div>
        <Pagination />
      </div>
    </div>
  )
}

import React, { ReactElement } from 'react'
import Pagination from '../../components/main/Pagination'
import Post from '../../components/main/Post'

interface Props {}

export default function index({}: Props): ReactElement {
  return (
    <div className='posts'>
      <h2 className='posts__title'>Tag: CSS</h2>
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

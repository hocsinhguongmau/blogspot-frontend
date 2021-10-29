import React, { ReactElement, useState } from 'react'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'

export default function Search(): ReactElement {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(search)
  }

  const [search, setSearch] = useState<String>('')

  return (
    <div className='search'>
      <form onSubmit={handleSearch}>
        <input
          placeholder='Search'
          type='text'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit'>
          <FiSearch />
        </button>
      </form>
    </div>
  )
}

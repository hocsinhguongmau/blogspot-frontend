import React, { ReactElement, useState } from 'react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import router, { useRouter } from 'next/router';

export default function Search(): ReactElement {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();
    if (query) {
      router.push(`/search/?q=${query}`);
    } else {
      router.push(`/`);
    }
  };

  const [search, setSearch] = useState<String>('');

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} required />
        <button type="submit">
          <FiSearch />
        </button>
      </form>
    </div>
  );
}

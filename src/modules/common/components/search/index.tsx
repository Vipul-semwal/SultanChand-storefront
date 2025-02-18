'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@lib/context/modal-context';
import { Button, Input } from '@medusajs/ui';

const SearchBar = () => {
  const router = useRouter();
  const { countryCode } = useParams();
  const { close } = useModal();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    console.log('Search triggered');
    close();
    console.log('Closing modal');

    router.push(`/${countryCode}/store?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="flex justify-center w-full items-center ">
      <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0  start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-8 text-sm text-gray-900 bg-[#FFF8EE] border-none placeholder:text-sm border-gray-300 rounded-sm  focus:ring-orange-500 focus:border-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500"
            placeholder="Search books, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white text-sm absolute end-3 bottom-[10px] bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-sm sm:text-sm px-2 py-1 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            disabled={!searchQuery.trim()}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

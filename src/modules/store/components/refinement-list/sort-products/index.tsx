'use client';

import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at' | "name_asc" | "name_desc";

type SortProductsProps = {
  sortBy: SortOptions;
  setQueryParams: (name: string, value: SortOptions) => void;
  'data-testid'?: string;
};

const sortOptions = [
  {
    value: 'created_at',
    label: 'Latest Arrivals',
  },
  {
    value: 'price_asc',
    label: 'Price: Low → High',
  },
  {
    value: 'price_desc',
    label: 'Price: High → Low',
  },
  {
    value: 'name_asc',
    label: 'Name: A → Z',
  },
  {
    value: 'name_desc',
    label: 'Name: Z → A',
  },
];


const SortProducts = ({ 'data-testid': dataTestId, sortBy, setQueryParams }: SortProductsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: SortOptions) => {
    setQueryParams('sortBy', value);
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find((option) => option.value === sortBy)?.label || 'Sort by';

  return (
    <div className="relative inline-block text-left" data-testid={dataTestId}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-xs  sm:text-xs  px-4 py-2 bg-white text-black border rounded-md"
      >
        {currentLabel} <BsChevronDown />
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border  rounded-md shadow-lg z-50">
          {sortOptions.map((option:{ value: string,label: string,}) => {
            const val = option.value as 'price_asc' | 'price_desc' | 'created_at'
            return (
              <button
              key={option.value}
              onClick={() => handleChange(val)} //too fixed
              className={`block px-4 text-xs  sm:text-xs   py-2  w-full text-left hover:bg-gray-100 ${
                sortBy === option.value ? 'font-semibold' : ''
              }`}
            >
              {option.label}
            </button>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default SortProducts;
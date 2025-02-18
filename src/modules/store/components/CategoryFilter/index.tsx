"use client"

import React, { ReactNode, useState } from "react"
import { useQueryData } from "@lib/hooks/useQueryData"
import { getCategoryByHandle } from "@lib/data/categories"
import Spinner from "@modules/common/icons/spinner"
import { transformProductCategory, ProductCategoryTypes } from "@lib/util/transformProductCategory"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategoryFilterProps = {
  handle: string,
  child:ReactNode
}

const CategoryFilter = ({ handle,child }: CategoryFilterProps) => {
  const { data: categoryData, isPending, isError } = useQueryData<HttpTypes.StoreProductCategory>(
    ["category", handle],
    () => getCategoryByHandle([handle]),
    !!handle
  )

  const categories = categoryData?.category_children?.map(transformProductCategory)

  if (isPending) return <Spinner />
  if (isError) return <p className="text-red-500 text-center py-4">Failed to load categories</p>

  return (
    <div className="bg-gray-100 shadow-md rounded-lg border border-gray-300 p-5 text-gray-800">
      <div className="div flex justify-center items-center">
      {child}
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-400 pb-2 mt-2 text-center">
        Browse Categories
      </h2>

      {categoryData?.category_children?.length ? (
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          {categories?.map((category) => (
            <MobileDropdown key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center">No subcategories available.</p>
      )}
    </div>
  )
}

const MobileDropdown: React.FC<{ category: ProductCategoryTypes; level?: number }> = ({ 
  category, 
  level = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = (category.category_children ?? []).length > 0;
  const paddingLeft = level * 16;

  return (
    <div 
      className="border-l-4 border-orange-500  shadow-lg my-2 transition-all hover:bg-gray-200 "
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <div className="flex justify-between items-center px-3 py-1">
        <LocalizedClientLink href={category.path} className="flex-grow">
          <button className="text-black font-bold text-sm hover:text-blue-800">
            {category.name}
          </button>
        </LocalizedClientLink>

        {hasChildren && (
          <button
            className="p-2 rounded-md transition-all bg-gray-300 hover:bg-gray-400"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={`Toggle ${category.name} submenu`}
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="orange"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-4 border-l-2 border-orange-500">
          {category.category_children?.map((child) => (
            <MobileDropdown 
              key={child.id} 
              category={child} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter

"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { FiFilter, FiX } from "react-icons/fi" // Importing filter and close icons
import CategoryFilter from "../CategoryFilter"
import SortProducts, { SortOptions } from "./sort-products"
import AuthorFilter from "../authorFilter"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string,
  handle?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId, handle }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false) // State to toggle popup

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="relative w-full">
      {/* Filter Button for Mobile */}
      <button 
        className="lg:hidden flex items-center gap-2 text-white bg-orange-600 px-4 py-2 rounded-md mb-4"
        onClick={() => setIsFilterOpen(true)}
      >
        <FiFilter size={12} />
        <span className="text-xs">Filters</span>
      </button>
      <div className="mb-5  hidden lg:block pr-2">
        <AuthorFilter/>
        </div>
      {/* Popup Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsFilterOpen(false)}
            >
              <FiX size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Filter Options</h2>

            {/* Filter Content */}
            {handle ? (
              <CategoryFilter handle={handle} child={<SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />} />
            ) : (
              <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
            )}
              <div className="mt-4">
        <AuthorFilter/>
        </div>
          </div>
        </div>
      )}

      {/* Filter Section (Visible on Desktop) */}
      <div className="hidden lg:block">
        {handle ? (
          <CategoryFilter handle={handle} child={<SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />} />
        ) : (
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
        )}
      </div>
    </div>
  )
}

export default RefinementList

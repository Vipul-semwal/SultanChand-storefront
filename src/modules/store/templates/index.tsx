import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import SortProducts, { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import GoBackToLastCategory from "@modules/common/components/GoBackToLastCategory/GoBackToLastCategory"
import GlobalHero from "@modules/common/components/globalhero"
import { MdNavigateNext } from "react-icons/md";

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  serchQuery,
  category,
  handle,
  searchby
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string,
  serchQuery?: string,
  category?: string,
  handle?: string,
  searchby?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  // console.log('hellooo',serchQuery);


  return (
    <div>
      <GlobalHero backgroundImage="/book.jpg" title="Searching" subtitle="We have lots of books so find a good for you!" />
      <div
      className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 content-container"
      data-testid="category-container"
    >
      {/* Left Section (4 columns on medium and larger screens) */}
     
        
     

      {/* Right Section (8 columns on medium and larger screens) */}
      <div className="md:col-span-12 w-full">
        <div className="mb-8 flex justify-between items-center text-sm w-full font-semibold text-blue-950 sm:text-2xl">
          <h1 data-testid="store-page-title" className="flex items-center">
            All Books <span><MdNavigateNext className="text-orange-600" /></span>
          </h1>
          {/* <RefinementList sortBy={sort} handle={handle} /> */}
          {/* <SortProducts sortBy={sort} setQueryParams={setQueryParams}  /> */}
          <GoBackToLastCategory />
        </div>

        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            searchQuery={serchQuery}
            categoryId={category}
            searchby={searchby}
          />
        </Suspense>
      </div>
    </div>
    </div>

  )
}

export default StoreTemplate

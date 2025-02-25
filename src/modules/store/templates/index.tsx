import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

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
  category?:string,
  handle?:string,
  searchby?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  // console.log('hellooo',handle)

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
     <div className="mr-5">
       <RefinementList sortBy={sort} handle={handle}/>
     </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
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
  )
}

export default StoreTemplate

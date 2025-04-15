import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types";
import { MdNavigateNext } from "react-icons/md";

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-6 py-6 content-container">
      
        
      

      <div className="md:col-span-12">
        <div className="mb-8 flex justify-between items-center text-sm w-full font-semibold text-blue-950 sm:text-2xl">
          <h1 className="truncate text-blue-950 flex items-center">{collection.title}<span><MdNavigateNext className="text-orange-600" /></span></h1>
          <RefinementList sortBy={sort} />
        </div>

        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

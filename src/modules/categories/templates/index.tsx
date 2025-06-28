import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import GlobalHero from "@modules/common/components/globalhero"
import { MdNavigateNext } from "react-icons/md"
import GoBackToLastCategory from "@modules/common/components/GoBackToLastCategory/GoBackToLastCategory"




export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  handle,
  query
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  handle?:string
  query: { [key: string]: string } 
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  //retrive last visited category from local storage
  console.log('query', query)

  

  return (
    <div>
       <GlobalHero backgroundImage="/book.jpg" title="Searching" subtitle="We have lots of books so find a good for you!" />
       <div className="py-6 content-container space-y-6" data-testid="category-container">
  {/* Top row: Breadcrumbs + Filters */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    {/* Breadcrumbs */}
    <div className="flex flex-wrap items-center gap-1 text-sm sm:text-xl font-semibold">
      {parents &&
        parents.map((parent) => (
          <span key={parent.id} className="text-ui-fg-subtle flex items-center">
            <LocalizedClientLink
              className="hover:text-black"
              href={`/categories/${parent.handle}?handle=${parent.handle}`}
              data-testid="sort-by-link"
            >
              {parent.name}
            </LocalizedClientLink>
            <MdNavigateNext className="text-orange-500" />
          </span>
        ))}
      <h1 className="flex items-center" data-testid="category-page-title">
        {category.name}
        <MdNavigateNext className="text-orange-600" />
      </h1>
     {/* <GoBackToLastCategory /> */}
    </div>

    {/* Filter / Sort dropdown */}
    <div className="w-full sm:w-auto">
      <RefinementList sortBy={sort} data-testid="sort-by-container" handle={handle} />
    </div>
  </div>

  {/* Optional: Category description */}
  {category.description && (
    <div className="text-base-regular">
      <p>{category.description}</p>
    </div>
  )}

  {/* Products grid */}
  <Suspense
    fallback={
      <SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />
    }
  >
    <PaginatedProducts
      sortBy={sort}
      page={pageNumber}
      categoryId={category.id}
      countryCode={countryCode}
    />
  </Suspense>
</div>

    </div>
    
  )
}

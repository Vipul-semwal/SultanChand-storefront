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



export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  handle,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  handle?:string
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

  return (
    <div>
       <GlobalHero backgroundImage="/book.jpg" title="Searching" subtitle="We have lots of books so find a good for you!" />
<div
      className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 content-container"
      data-testid="category-container"
    >
      <div className="md:col-span-2">
         <RefinementList sortBy={sort} data-testid="sort-by-container" handle={handle}/>
      </div>
     
      <div className="md:col-span-10 w-full">
        <div className="flex flex-row mb-8 text-xs sm:text-xl font-semibold gap-1">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle flex items-center">
                <LocalizedClientLink
                  className=" hover:text-black"
                  href={`/categories/${parent.handle}?handle=${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                <MdNavigateNext className="text-orange-500" width={"12px"} />

              </span>
            ))}
          <h1 className="flex items-center text-xs   sm:text-xl" data-testid="category-page-title">{category.name}<span><MdNavigateNext className="text-orange-600" /></span></h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {/* {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )} */}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
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
    </div>
    
  )
}

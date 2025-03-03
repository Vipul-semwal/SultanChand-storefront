import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text, Heading, Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import { ArrowUpRightMini } from "@medusajs/icons"
// fonts

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <>
      <div className="content-container pb-9 small:pb-9">
        <div className="flex justify-between mb-4">
          {/* Responsive Heading */}
          <h2
            
            className="font-bold  text-[#EA5900] border-b-2 border-[#EA5900] text-sm sm:text-lg md:text-xl lg:text-2xl"
          >
            {collection.title}
          </h2>

          {/* Responsive Button */}
          <InteractiveLink href={`/collections/${collection.handle}`}>
            <button style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-[#EA5900] text-white px-2 py-2 rounded-sm font-medium flex items-center text-xs sm:text-base md:text-lg lg:text-sm justify-center gap-1 hover:bg-[#EA5900] transition-all duration-300 border-none outline-none">
              View More
              <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" color="white" />
            </button>
          </InteractiveLink>  
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-20 md:gap-y-27">
          {pricedProducts &&
            pricedProducts.map((product) => (
              <li key={product.id}>
                <ProductPreview product={product} region={region} isFeatured />
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

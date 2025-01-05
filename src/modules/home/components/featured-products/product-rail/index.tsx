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
      <div className="content-container py-9 small:py-20">
        <div className="flex justify-between mb-4 ">
          <Heading level={"h2"} className="font-bold text-[#3e81fe]  text-2xl ">{collection.title}</Heading>

          <InteractiveLink href={`/collections/${collection.handle}`}>
            <button className="bg-[#3e81fe] text-white px-3 py-2 rounded-lg flex items-center text-[15px] justify-center gap-2 hover:bg-blue-400 transition-all duration-300 border-none outline-none">
              View More
              <ArrowUpRightMini
                className="group-hover:rotate-45 ease-in-out duration-150"
                color="white"
              />
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

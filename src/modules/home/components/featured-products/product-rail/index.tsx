import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text,Heading,Button } from "@medusajs/ui"
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
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between ">
        <Heading level={"h2"} className="font-bold text-[#008EBB]  text-2xl ">{collection.title}</Heading>
        
        <InteractiveLink href={`/collections/${collection.handle}`}>
        <Button className="bg-[#008EBB]  hover:bg-blue-500">View More   <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="white"
      /></Button>
        </InteractiveLink>
      </div>
        <Divider className="mb-5 border-2 border-[#008EBB] "/>
      <ul className="grid grid-cols-2  small:grid-cols-6 gap-x-6 gap-y-24 small:gap-y-36">
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

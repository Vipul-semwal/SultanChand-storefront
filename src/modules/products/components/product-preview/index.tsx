import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const handleChildClick = (event:React.MouseEvent<HTMLDivElement>) => {  
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    console.log("Child clicked!");
  };

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group outline-none">
      <div data-testid="product-wrapper " className="outline-none text-center flex flex-col items-center">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between items-center text-center">
          <Text className="text-ui-fg-subtle font-bold text-center" data-testid="product-title">
            {product.title}
          </Text>

        </div>
        <div className="flex items-center gap-x-2">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
        <button  className="text-[#CF4747] mt-2 border border-[#CF4747] py-1.5 px-4 text-[12px] sm:text-base leading-5 font-semibold tracking-wider rounded-full bg-transparent transition-all duration-400 hover:bg-[#CF4747] hover:text-white">
  Add To Cart
</button>

      </div>

    </LocalizedClientLink>
  )
}

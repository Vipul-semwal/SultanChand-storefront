import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"
import { getCategoryByHandle } from "@lib/data/categories"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }
  // console.log('region haiye',product);
  console.log('category haiye', product.categories);
  const productCategory = product.categories && product.categories.length > 0 && product.categories[0].handle
    ? await getCategoryByHandle([product.categories[0].handle as string])
    : null

    console.log('productCategory haiye --------------------------------------------------------------------------------', productCategory);
  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({ 
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }
const categoryProducts = productCategory?.products ?? []
const collectionProducts = products ?? []
 const uniqueProducts = Array.from(
  new Map(
    [...categoryProducts, ...collectionProducts].map((p) => [p.id, p])
  ).values()
)

const PRODUCTS = uniqueProducts.slice(0, 7)

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base-regular text-orange-500 mb-2">
          Related Books
        </span>
        <p className="text-xl-regular text-ui-fg-base sm:text-2xl">
          You might also want to check out these Books.
        </p>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-7 gap-x-6 gap-y-8">
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}

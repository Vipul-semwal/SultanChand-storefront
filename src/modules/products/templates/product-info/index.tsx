"use client"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import useToggleState from "@lib/hooks/use-toggle-state"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const MAX_WORDS = 100

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { state: expanded, toggle } = useToggleState(false)

  const words = product.description?.split(" ") || []
  const isLong = words.length > MAX_WORDS
  const shortDescription = words.slice(0, MAX_WORDS).join(" ") + "..."

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-2xl leading-10 sm:text-2xl text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {expanded || !isLong ? product.description : shortDescription}
        </Text>

        {isLong && (
          <button
            onClick={toggle}
            className="text-ui-fg-muted hover:text-ui-fg-subtle mt-2 text-sm text-red-700"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductInfo

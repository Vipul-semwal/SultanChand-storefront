"use client"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import useToggleState from "@lib/hooks/use-toggle-state"
import Modal from "@modules/common/components/modal"
import React, { useEffect, useState } from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const MAX_WORDS = 10

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { state: expanded, toggle } = useToggleState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const words = product.description?.split(" ") || []
  const isLong = words.length > MAX_WORDS
  const shortDescription = words.slice(0, MAX_WORDS).join(" ") + "..."

  return (
    <div id="product-info" className="relative">
      <div className="flex flex-col gap-y-4 w-full">
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

        {/* DESCRIPTION */}
        <div className="relative p-4 rounded-md shadow-md">
          <p className="text-medium text-gray-700 leading-6">
            {expanded || !isLong ? product.description : shortDescription}
          </p>

          {isLong && (
            <button
              onClick={toggle}
              className="text-red-700 hover:text-red-800 mt-2 text-sm font-semibold"
            >
              {expanded ? "Show Less ⌃" : "Read More ⌄"}
            </button>
          )}
        </div>

        {/* MODAL ONLY ON MOBILE */}
        {isMobile && (
          <Modal isOpen={expanded} close={toggle} size="medium">
            <Modal.Title>Product Description</Modal.Title>
            <Modal.Body>
              <p className="text-gray-800 mt-3">{product.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={toggle}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ProductInfo

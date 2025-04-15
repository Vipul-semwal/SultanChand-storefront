"use client"

import React from "react"
import ProductRating from "../reviews/ProductRating"
import { HttpTypes } from "@medusajs/types"
import { VariantPrice } from "types/global"
import PreviewPrice from "../product-preview/price"
import ExpandableText from "@modules/common/components/read-more-less"
import { useParams, notFound } from "next/navigation"
import QuickAddToCart from "./quickAddtoCar"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface QuickViewProps {
  productInfo: HttpTypes.StoreProduct
  cheapestPrice?: VariantPrice | null
  author?: { name: string }[]
  cb?: () => void
}

const QuickView: React.FC<QuickViewProps> = ({
  productInfo,
  cheapestPrice,
  author,
  cb,
}) => {
  const { countryCode } = useParams() as { countryCode: string }
  if (!countryCode) notFound()
    
    const authorNames = author
  ?.map((a) => a?.name?.trim())
  .filter((name) => typeof name === "string" && name.length > 0)
  .join(", ") || "No Author";


  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center overflow-hidden max-h-[90vh]">
      {/* Book Image */}
      <div className="hidden sm:flex justify-center items-start sm:max-w-[30%]">
        <img
          src={productInfo?.images?.[0]?.url ?? ""}
          alt={productInfo?.title ?? "Product image"}
          className="h-60 w-auto object-contain rounded-lg"
        />
      </div>

      {/* Book Details */}
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between overflow-y-auto max-h-[60vh]">
        <h2 className="text-lg sm:text-xl font-bold">
          {productInfo?.title || "Untitled Product"}
        </h2>

        {authorNames && (
          <p className="text-sm text-gray-500 italic mt-1">
            Author: {authorNames}
          </p>
        )}

        <ExpandableText
          text={productInfo?.description ?? "No description available."}
          maxLength={160}
        />

        <div className="text-lg text-[#EA5900] font-bold mt-3">
          <PreviewPrice price={cheapestPrice} />
        </div>

        <ProductRating productId={productInfo.id} />

        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
          {cheapestPrice && (
            <QuickAddToCart
              product={productInfo}
              countryCode={countryCode}
              cb={cb}
            />
          )}
          <LocalizedClientLink href={`/products/${productInfo.handle}`}>
            <button className="bg-gray-100 text-gray-700 text-xs sm:text-sm py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-gray-200 w-full">
              Full Details
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default QuickView

import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import PdfAndLinks from '../components/pdfAndLinks'
import Review from "./review"
import ProductRating from "../components/reviews/ProductRating" 

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
  className="content-container grid grid-cols-1 small:grid-cols-[25%_50%_25%] gap-4 py-6 relative"
  data-testid="product-container"
>
  {/* Image (Mobile) */}
  <div className="block w-full relative small:hidden">
    <ImageGallery images={product?.images || []} />
  </div>

  {/* Image (Desktop) */}
  <div className="hidden small:block relative sticky top-24">
    <ImageGallery images={product?.images || []} />
  </div>

  {/* Middle Content: Product Info + Tabs */}
  <div className="flex flex-col w-full py-8 gap-y-6 px-2">
    <ProductInfo product={product} />
    <ProductTabs product={product} />
  </div>

  {/* Right Panel: CTA + Rating + PDF */}
  <div className="flex flex-col items-start gap-4  px-2"> 
  <div className="">
  <ProductOnboardingCta />
  </div>
    <Suspense
      fallback={
        <ProductActions disabled={true} product={product} region={region} />
      }
    >
     <div className="w-full">
     <ProductActionsWrapper id={product.id} region={region} />
     </div>
    </Suspense>
    <div className="rating mt-3">
      <ProductRating productId={product.id} fontSize="large" />
    </div>
    <div className="pdfandlink mt-5">
      <PdfAndLinks product_id={product.id} />
    </div>
  </div>
</div>

  
      <div className="review">
        <Review prouduct_id={product.id} />
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>

    </>
  )
}

export default ProductTemplate

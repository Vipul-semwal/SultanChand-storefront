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
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >

       {/* For mobile */}
<div className="block w-full relative small:hidden">
  <ImageGallery images={product?.images || []} />
</div>

{/* For desktop */}
<div className="hidden small:block small:w-[30%] relative small:sticky ">
  <ImageGallery images={product?.images || []} />
</div>

<div className="flex flex-col  small:top-48 small:py-0 small:w-[70%] w-full py-8 gap-y-6 small:p-5">
<ProductInfo product={product} />
<ProductTabs product={product} />
<div className="flex flex-col  small:flex-col small:top-48 small:py-0 small: w-full py-8 gap-y-12 justify-between">
         <div className="ctarating">
         <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          <div className="review flex justify-center items-center mt-2">
          <ProductRating productId={product.id} fontSize="large" />
          </div>

         </div >
        
         <div className="pdfandlink ">
         <PdfAndLinks product_id={product.id} />
         </div>
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

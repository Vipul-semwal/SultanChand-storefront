import React from 'react'
import ProductReviewForm from '@modules/products/components/reviews/review-form'
import ProductReviews from '@modules/products/components/reviews/reviewlist'
import ProductRating from '@modules/products/components/reviews/ProductRating'
type props = {
    prouduct_id:string
}
function Review({prouduct_id}:props) {
  return (
    <>
    {/* <ProductRating productId={prouduct_id}/> */}
    <ProductReviews productId={prouduct_id}/>
    </>
  )
}

export default Review
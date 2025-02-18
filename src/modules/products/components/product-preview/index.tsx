"use client";
import { FiEye } from "react-icons/fi";
import { Text } from "@medusajs/ui";
import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import QuickView from "../quick-view";
import Modal from "@modules/common/components/modal";
import useToggleState from "@lib/hooks/use-toggle-state";
import ProductRating from "../reviews/ProductRating"; // Updated ProductRating

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct;
  isFeatured?: boolean;
  region: HttpTypes.StoreRegion;
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  const [isQuickViewOpen, openQuickView, closeQuickView] = useToggleState();

  return (
    <div className="test">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="group outline-none"
      >
        <div
          data-testid="product-wrapper"
          className="outline-none text-center flex flex-col items-center"
        >
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="flex txt-compact-medium mt-4 justify-between items-center text-center">
            <Text
              className="text-ui-fg-subtle font-bold text-center"
              data-testid="product-title"
            >
              {product.title}
            </Text>
          </div>

          {/* Only Stars Rating Section */}
          <div className="flex items-center justify-center ">
            <ProductRating
              productId={product.id} // Pass the product ID to fetch reviews
              fontSize="medium"
              showDetails={false} // Hide average rating and total reviews
            />
          </div>

          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </LocalizedClientLink>
      <div className="flex items-center justify-center w-full">
        <button
          onClick={openQuickView}
          className="text-[#CF4747] mt-2 border border-[#CF4747] py-1.5 px-2 text-[12px] sm:text-base leading-5 font-semibold tracking-wider rounded-full bg-transparent transition-all duration-400 hover:bg-[#CF4747] hover:text-white flex items-center gap-2"
        >
          <FiEye className="text-base " />
          Quick View
        </button>
        <Modal isOpen={isQuickViewOpen} close={closeQuickView} size="medium">
          <Modal.Title><p className="border-l-orange-500 border-l-4 p-1">Quick View</p></Modal.Title>
          <Modal.Body>
            <div className="p-4">
            {cheapestPrice && <QuickView productInfo={product} cheapestPrice={cheapestPrice} />}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

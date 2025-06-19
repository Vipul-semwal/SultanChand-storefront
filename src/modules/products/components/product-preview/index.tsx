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
import { useQueryData } from "@lib/hooks/useQueryData";
import { useProductData } from "@lib/hooks/useProductData";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { sdk } from "@lib/config";

export type Author = {
  id: string;
  name: string;
  description: string;
  image: string;
  subText: string;
}[];




export default function   ProductPreview({
  product,
  isFeatured,
  region,
  haveTofetchAgain = false,
}: {
  product: HttpTypes.StoreProduct;
  isFeatured?: boolean;
  region: HttpTypes.StoreRegion;
  haveTofetchAgain?: boolean;
}) {
  const [productData, setProductData] = useState<HttpTypes.StoreProduct>(product);

  const params = useParams();
  const countryCode = params?.countryCode as string;

  // ✅ Always call useProductData, but avoid fetching inside it
  const { data, isFetching } = useProductData(
    countryCode,
    product.handle,
    haveTofetchAgain // Hook ke andar handle hoga ki API call karni hai ya nahi
  );



  useEffect(() => {
    if (haveTofetchAgain && data && !isFetching) {
      setProductData(data);
    }
  }, [haveTofetchAgain, data, isFetching]);

  const { cheapestPrice } = getProductPrice({
    product: productData,
  });

  const [isQuickViewOpen, openQuickView, closeQuickView] = useToggleState();;

  // getting author
  const getAuthor = ()=>{
      return sdk.client.fetch<{author:Author}>(`/store/authors/product/${product.id}`,{
       method:"Get",
      })
     }
   
     const {data:author,isFetching:loading,} = useQueryData<{author:Author}>(["prodcutPreviewAuthor",product.id],getAuthor,true,{ 
      queryKey: ["prodcutPreviewAuthor",product.id],
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
      retry: 1,
    });
    if (author && author.author.length > 0) {
      // console.log('authorhaibhaiiska:', author.author[0]);
    } else {
      console.log('No author data available.');
    }

  return (
    <div className="test">
      <LocalizedClientLink
        href={`/products/${productData.handle}`}
        className="group outline-none"
      >
        <div
          data-testid="product-wrapper"
          className="outline-none text-center flex flex-col items-center"
        >
          <Thumbnail
            thumbnail={productData.thumbnail}
            images={productData.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="flex txt-compact-medium mt-4 justify-between items-center text-center ">
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                maxWidth: 'clamp(100px, 10vw, 150px)', // Responsive between 100px and 150px
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              className="text-ui-fg-subtle font-bold text-center text-xs sm:text-sm"
              data-testid="product-title"
            >
              {productData.title}
            </p>



          </div>

          {/* Only Stars Rating Section */}
          <div className="flex items-center justify-center">
  {/* {author?.author?.[0]?.name && (
    <p className="text-sm text-gray-500 italic">by {author.author[0].name}</p>
  )} */}
   {/* <ProductRating
              productId={productData.id} // Pass the product ID to fetch reviews
              fontSize="medium"
              showDetails={false} // Hide average rating and total reviews
            /> */}
</div>



          <div className="flex items-center  gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </LocalizedClientLink>
      <div className="flex items-center justify-center w-full">
        <button
          onClick={openQuickView}
          className="text-[#CF4747] mt-2 border border-[#CF4747] py-1 px-2 text-xs sm:text-sm leading-5 font-semibold tracking-wider rounded-full bg-transparent transition-all duration-400 hover:bg-[#CF4747] hover:text-white flex items-center gap-1"
        >
          <FiEye className="text-base " />
          Quick View
        </button>
        <Modal isOpen={isQuickViewOpen} close={closeQuickView} size="medium">
          <Modal.Title><p className="border-l-orange-500 border-l-4 p-1">Quick View</p></Modal.Title>
          <Modal.Body>
            <div className="p-4">
              {<QuickView productInfo={productData} cheapestPrice={cheapestPrice ? cheapestPrice : null} author={author?.author} />}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

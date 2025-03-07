"use client";

import React from "react";
import ProductRating from "../reviews/ProductRating";
import { HttpTypes } from "@medusajs/types";
import { VariantPrice } from "types/global";
import PreviewPrice from "../product-preview/price";
import ExpandableText from "@modules/common/components/read-more-less";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import QuickAddToCart from "./quickAddtoCar";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

interface QuickViewProps {
  productInfo: HttpTypes.StoreProduct;
  cheapestPrice?: VariantPrice | null;
  cb?: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ productInfo, cheapestPrice, cb }) => {
  const { countryCode } = useParams() as { countryCode: string };
  if (!countryCode) {
    notFound();
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl rounded-lg flex flex-col sm:flex-row overflow-hidden">
        {/* Book Image */}
        <div className="w-full flex justify-center sm:w-1/2">
          <img
            src={productInfo?.images?.[0]?.url ?? undefined}
            alt={productInfo.title}
            className="w-30 h-64 sm:h-auto sm:w-full object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="w-full p-0 sm:p-6 sm:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{productInfo.title}</h2>
            <div
              className="max-h-48 overflow-y-auto custom-scrollbar"
            >
              <ExpandableText
                text={productInfo.description ?? "No description available for this product."}
                maxLength={160}
              />
            </div>

            <div className="text-xl font-bold text-[#EA5900] mt-6">
              <PreviewPrice price={cheapestPrice} />
            </div>
          </div>

          <ProductRating productId={productInfo.id} />

          {/* Buttons */}
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            {cheapestPrice && (
              <QuickAddToCart product={productInfo} countryCode={countryCode} cb={cb} />
            )}
            <LocalizedClientLink href={`/products/${productInfo.handle}`}>
              <button className="bg-gray-100 text-gray-700 py-3 rounded-lg text-sm hover:bg-gray-200 transition-all w-full">
                Full Details
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Thin Custom Scrollbar Styling */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #EA5900 #f1f1f1;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #EA5900;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default QuickView;
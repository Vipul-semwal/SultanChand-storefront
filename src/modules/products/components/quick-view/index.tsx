"use client";

import React from "react";
import ProductRating from "../reviews/ProductRating";
import { HttpTypes } from "@medusajs/types";

interface QuickViewProps {
  productInfo: HttpTypes.StoreProduct;
}

const QuickView: React.FC<QuickViewProps> = ({ productInfo }) => {
  const product = {
    name: "The Great Gatsby",
    description:
      "A classic novel by F. Scott Fitzgerald that explores themes of wealth, love, and the American Dream. A must-read for literature enthusiasts.",
    price: 19.99,
    image:
      "https://cimg.acharyaprashant.org/images/img-8fcfcc03-93ed-46f4-80ab-ea393a84c0bf/30/image.jpg",
  };

  return (
    <div className="w-full  flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl rounded-lg flex flex-col sm:flex-row overflow-hidden">
        {/* Book Image */}
        <div className="w-full sm:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 sm:h-auto object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
            <p className="text-xl font-bold text-blue-900 mt-6">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <ProductRating productId={productInfo.id} />

          {/* Buttons */}
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <button
              className="bg-blue-900 text-sm text-white py-3 rounded-lg hover:bg-blue-800 transition-all"
              onClick={() => console.log("Added to Cart")}
            >
              Add to Cart
            </button>
            <button
              className="bg-gray-100 text-gray-700 py-3 rounded-lg text-sm hover:bg-gray-200 transition-all"
              onClick={() => console.log("View Full Details")}
            >
              Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;

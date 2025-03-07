"use client";

import React from "react";
import { useQueryData } from "@lib/hooks/useQueryData";
import { sdk } from "@lib/config";
import Loading from "app/[countryCode]/(main)/account/loading";
import ProductPreview from "@modules/products/components/product-preview";
import { HttpTypes } from "@medusajs/types";

// Define the Author type
export type Author = {
  data: {
    id: string;
    name: string;
    description: string;
    image: string;
    subText: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    products: HttpTypes.StoreProduct[] | [];
  }[];
};

// Error Fallback Component
function ErrorFallback({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-3xl font-bold text-gray-800">😢 Something went wrong</h1>
      <p className="text-gray-600 mt-4">{message}</p>
      <button
        className="mt-6 bg-[#EA5900] text-white px-5 py-3 rounded-lg hover:bg-[#d14f00] transition"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
}

function AuthorInfo({ id, region }: { id: string; region?: HttpTypes.AdminRegion }) {
  // Fetch author data
  const { data, isFetching, isError } = useQueryData<Author>(
    [`authors-${id}`],
    () => sdk.client.fetch(`/store/authors/${id}`)
  );

  if (isFetching) return <Loading />;

  if (isError) return <ErrorFallback message="Failed to load author details. Please try again later." />;

  const { name, description, image, subText, products } = data?.data[0] || {
    name: "",
    description: "",
    image: null,
    subText: "",
    products: [],
  };

  return (
    <>
      {/* Author Info Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Author Image */}
          <div className="w-full">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full rounded-2xl shadow-lg object-cover aspect-[4/4]"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 rounded-2xl shadow-lg flex items-center justify-center">
                <span className="text-gray-600">Image Not Available</span>
              </div>
            )}
          </div>

          {/* Author Details */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-5xl font-extrabold text-blue-950">
              {name}
            </h1>
            <h4 className="text-lg sm:text-2xl font-semibold text-orange-500 mt-4">
              {subText}
            </h4>
            <div
              className="mt-6 text-gray-700 text-sm sm:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </section>

      {/* Author's Work Section */}
      {/* {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Featured <span className="text-[#EA5900]">Works</span>
          </h2>

          <ul
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            data-testid="products-list"
          >
            {products.map((p) => (
              <li key={p.id}>
                <ProductPreview product={p} region={region} />
              </li>
            ))}
          </ul>
        </section>
      )} */}
    </>
  );
}

export default AuthorInfo;

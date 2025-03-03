"use client";

import React from "react";
import { useQueryData } from "@lib/hooks/useQueryData";
import { sdk } from "@lib/config";
import Loading from "app/[countryCode]/(main)/account/loading";
import ProductPreview from "@modules/products/components/product-preview";
import { HttpTypes } from "@medusajs/types";

// Define the type for an Author
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
      <h1 className="text-2xl font-bold text-gray-800">😢 Something went wrong</h1>
      <p className="text-gray-600 mt-2">{message}</p>
      <button
        className="mt-4 bg-[#EA5900] text-white px-4 py-2 rounded hover:bg-[#EA5900]"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
}

function AuthorInfo({ id,region }: { id: string,region?:HttpTypes.AdminRegion }) {
  // API request to fetch author info
  const { data, isFetching, isError } = useQueryData<Author>(
    [`authors${id}`],
    () => sdk.client.fetch(`/store/authors/${id}`)
  );

  // Loading state
  if (isFetching) {
    return <Loading />;
  }

  // Error state
  if (isError) {
    return <ErrorFallback message="Failed to load author details. Please try again later." />;
  }
   console.log('bombo:',data)
  // Destructure data with a fallback
  const { name, description, image, subText,products } = data?.data[0] || {
    name: "",
    description: "",
    image: null,
    subText: "",
    products:[]
  };


  // const nameArray = name.split(" ");
  // const firstName = nameArray[0];
  // const lastName = nameArray.slice(1).join(" ");

  return (
    <>
      {/* Author Info Section */}
      <section className="bg-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
          {/* Author Photo - Top */}
          <div className="w-full">
            {image ? (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <img
                  src={image}
                  alt={`${name}'s photo`}
                  className="absolute top-0 left-0 w-full h-full object-contain rounded-lg shadow-md"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
          </div>

          {/* Author Info - Below Image */}
          <div className="w-full text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              {/* <span className="text-[#EA5900]">{firstName}</span> {lastName} */}
            </h2>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-600 mt-2">
              {subText}
            </h4>
            <div className="text-gray-600 mt-4 text-left" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </section>

      {/* Additional Section */}
      <section className="contain-content mt-6">
        {/* <div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center">
            His <span className="text-[#EA5900]">Best</span> Work
             <ul
                      className="grid grid-cols-2 w-full xsmall:grid-cols-4 small:grid-cols-4 medium:grid-cols-5 gap-x-6 gap-y-8"
                      data-testid="products-list"
                    >
                      {products.map((p) => (
                        <li key={p.id}>
                          <ProductPreview product={p} region={region} />
                        </li>
                      ))}
                    </ul>
          </h2>
        </div> */}
        {/* Add content dynamically here */}
      </section>
    </>
  );
}

export default AuthorInfo;

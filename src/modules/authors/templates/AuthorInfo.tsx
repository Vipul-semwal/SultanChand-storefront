"use client";

import React from "react";
import { useQueryData } from "@lib/hooks/useQueryData";
import { sdk } from "@lib/config";
import Loading from "app/[countryCode]/(main)/account/loading";
import ProductPreview from "@modules/products/components/product-preview";
import { HttpTypes } from "@medusajs/types";
import { getRegion } from "@lib/data/regions";
import {makeSerch} from "@lib/data/products";
import InteractiveLink from "@modules/common/components/interactive-link";
import { ArrowUpRightMini } from "@medusajs/icons";

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

function AuthorInfo({ id, region }: { id: string; region?: HttpTypes.StoreRegion }) {
  // Fetch author data
  const { data, isFetching, isError } = useQueryData<Author>(
    [`authors-${id}`],
    () => sdk.client.fetch(`/store/authors/${id}`)
  );

  const { data:books, isFetching:loading, isError:error } = useQueryData<HttpTypes.StoreProduct[] | []>(
    [`authors-book-${id}`],
 async ()=>{
  const { products: data, status } = await makeSerch({
       page:1,
       limit: 5,
       name: "author",
       query: name,
     })
     return data
  }
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
  <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
    {/* Author Image */}
    <div className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full rounded-2xl shadow-lg object-cover aspect-square"
        />
      ) : (
        <div className="w-full h-auto bg-gray-300 rounded-2xl shadow-lg flex items-center justify-center">
          <span className="text-gray-600">Image Not Available</span>
        </div>
      )}
    </div>

    {/* Author Details */}
    <div className="mt-6">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950">
        {name}
      </h1>
      <h4 className="text-lg sm:text-2xl font-semibold text-orange-500 mt-2">
        {subText}
      </h4>
      <div
        className="mt-4 text-gray-700 text-sm sm:text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  </div>
</section>



        {(books ?? []).length === 0 ? (
             <div className="flex justify-center items-center h-32 text-gray-500 text-lg">
               No Books of Author yet.
             </div>
           ) : (
             <ul
               className="grid grid-cols-2 w-full xsmall:grid-cols-4 small:grid-cols-4 medium:grid-cols-5 gap-x-6 gap-y-8"
               data-testid="products-list"
             >

               {region? books?books.map((p) => (
                 <li key={p.id}>
                   <ProductPreview product={p} region={region} haveTofetchAgain={true} />
                 </li>
               )):(<div>no books of author yet.</div>):null}
                <ul
               className="grid grid-cols-2 w-full xsmall:grid-cols-4 small:grid-cols-4 medium:grid-cols-5 gap-x-6 gap-y-8"
               data-testid="products-list"
             >
              <h1>Books of Authors</h1>
               {region? books?books.map((p) => (
                 <li key={p.id}>
                   <ProductPreview product={p} region={region} haveTofetchAgain={true} />
                 </li>
               )):(<div>no books of author yet.</div>):null}
             </ul>
              <InteractiveLink href={`/store/q=${name}&searchby=author`}>  
              <button
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="bg-[#EA5900] text-white px-2 py-2 rounded-sm font-medium flex items-center text-xs sm:text-base md:text-lg lg:text-sm justify-center gap-1 hover:bg-[#EA5900] transition-all duration-300 border-none outline-none"
              >
                View More
                <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" color="white" />
              </button>
            </InteractiveLink>
             </ul>
           )}
    </>
  );
}

export default AuthorInfo;

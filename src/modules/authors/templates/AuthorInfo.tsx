"use client";

import React from "react";
import { useQueryData } from "@lib/hooks/useQueryData";
import { sdk } from "@lib/config";
import Loading from "app/[countryCode]/(main)/account/loading";
import ProductPreview from "@modules/products/components/product-preview";
import { HttpTypes } from "@medusajs/types";
import { makeSerch } from "@lib/data/products";
import { ArrowUpRightMini } from "@medusajs/icons";

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
  const { data, isFetching, isError } = useQueryData<Author>(
    [`authors-${id}`],
    () => sdk.client.fetch(`/store/authors/${id}`)
    
  );

  const { name, description, image, subText } = data?.data[0] || {
    name: "",
    description: "",
    image: null,
    subText: "",
    products: [],
  };


  const { data: books, isFetching: loading, isError: error } = useQueryData<HttpTypes.StoreProduct[] | []>(
    [`authors-books-${name}`],
    async () => {
      const { products: data } = await makeSerch({
        page: 1,
        limit: 20,
        name: "author",
        query: name,
      });
      return data;
    }
  );
  console.log("books", books, region, data);

  if (isFetching) return <Loading />;
  if (isError) return <ErrorFallback message="Failed to load author details. Please try again later." />;

  
  return (
    <>
      {/* Author Info Section */}
      <section className="bg-gray-100 py-12 px-4">
  <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 items-start">
    {/* Sticky Image */}
    <div className="col-span-12 sm:col-span-3 md:col-span-4 lg:col-span-3">
      <div className="sticky top-24">
        {image ? (
          <img
            src={image}
            alt={name}
            className="rounded-2xl shadow-lg object-cover aspect-square w-full"
          />
        ) : (
          <div className="w-full bg-gray-300 rounded-2xl shadow-lg flex items-center justify-center aspect-square">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
      </div>
    </div>

    {/* Text Content */}
    <div className="col-span-12 sm:col-span-9 md:col-span-8 lg:col-span-9">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950">{name}</h1>
      <h4 className="text-lg sm:text-lg font-semibold text-orange-500 mt-2">{subText}</h4>

      <div
        className="mt-4 text-gray-700 text-xs sm:text-sm leading-relaxed max-h-[400px] overflow-y-auto pr-2 custom-scroll"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  </div>
</section>


      {/* Books Section */}
      {(books ?? []).length === 0 ? (
        <div className="flex justify-center items-center h-32 text-gray-500 text-lg">
          No books by this author yet.
        </div>
      ) : (
        <div className="flex flex-col mt-5 px-6 mb-5">
          <h1 className="text-xl font-bold text-center mb-6">Books by {name}</h1>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-8 gap-x-6 gap-y-8">
            {region &&
              books?.map((p) => (
                <li key={p.id}>
                  <ProductPreview product={p} region={region} haveTofetchAgain={true} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default AuthorInfo;

"use client";

import React from "react";
import { useQueryData } from "@lib/hooks/useQueryData";
import { sdk } from "@lib/config";
import Loading from "app/[countryCode]/(main)/account/loading";

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
  };
};

// Error Fallback Component
function ErrorFallback({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-2xl font-bold text-gray-800">😢 Something went wrong</h1>
      <p className="text-gray-600 mt-2">{message}</p>
      <button
        className="mt-4 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-800"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
}

function AuthorInfo({ id }: { id: string }) {
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

  // Destructure data with a fallback
  const { name, description, image, subText } = data?.data || {
    name: "",
    description: "",
    image: null,
    subText: "",
  };

  const nameArray = name.split(" ");
  const firstName = nameArray[0]; 
  const lastName = nameArray.slice(1).join(" ");
  return (
    <>
      {/* Author Info Section */}
      <section className="bg-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
          {/* Author Photo - Left Side */}
          <div className="md:w-1/3">
            {image ? (
              <img
                src={image}
                alt={`${name}'s photo`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
          </div>

          {/* Author Info - Right Side */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            <span className="text-blue-800">{firstName}</span> {lastName}
            </h2>
            <h4 className="text-xl sm:text-3xl md:text-xl font-bold text-gray-800 mb-4">
              {subText}
            </h4>
            <p className="text-sm sm:text-base text-gray-600 mb-4">{description}</p>
          </div>
        </div>
      </section>

      {/* Additional Section */}
      <section className="contain-content mt-6">
        <div>
          <h2 className="text-4xl font-semibold text-center">
            His <span className="text-blue-800">Best</span> Work
          </h2>
        </div>
        {/* Add content dynamically here */}
      </section>
    </>
  );
}

export default AuthorInfo;

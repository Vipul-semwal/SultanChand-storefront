"use client";

import React, { Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Globalhero from "../../common/components/globalhero/index";
import { sdk } from "@lib/config";
import { useQueryData } from "@lib/hooks/useQueryData";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Loading from "app/[countryCode]/(main)/account/loading";
import { Pagination } from "@modules/store/components/pagination";
import { useSearchParams } from "next/navigation";


// Define the type for the Authors response
type AuthorsResponse = {
  author: {
    id: string;
    name: string;
    description: string;
    image: string;
    subText: string;
  }[];
  count: number;
  limit: number;
  offset: number;
};


// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <span className="text-5xl">😢</span>
      <h1 className="text-2xl font-bold mt-4">Something went wrong!</h1>
      <p className="mt-2">{error.message}</p>
      <button
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
}

// AuthorTemplate Component
function AuthorTemplate() {

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 15;
   
  // Calculate offset based on the current page
  const offset = useMemo(() => currentPage * limit, [currentPage]);

  // Fetch authors data using React Query
  const { data, isFetching } = useQueryData<AuthorsResponse>(
    ["authors", limit, offset],
    () =>
      sdk.client.fetch(`/store/authors`, {
        query: { limit, offset },
      })
  );

  const { author: authors,count=0, } = data || { author: [] };
  
  const page = searchParams.get("page") ; 
  const pageNumber = page ? parseInt(page) : 1
  const totalPages = Math.ceil(count / limit);
  return (
    <>
      <Globalhero
        backgroundImage="/banner.jpg"
        title="Authors"
        subtitle="In a creative workplace, employees responsibly try different solutions"
      />
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Our <span className="text-red-400">Authors</span>
            </h2>
            <p className="text-gray-600 mt-2">
              In a creative workplace, employees responsibly try different solutions.
            </p>
          </div>

          {/* Authors Grid */}
          {isFetching ? (
            <p>Loading authors...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {authors.map((author,index) => (
                <div key={author.id} className="bg-white shadow-md rounded-lg overflow-hidden" data-testid="author-card">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{author.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{author.subText}</p>
                    <p className="text-gray-600 mb-6">{author.description}</p>
                    <LocalizedClientLink
                      href={`/authors/${author.id}`}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      View Profile
                    </LocalizedClientLink>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Pagination
        page={pageNumber}
        totalPages={totalPages} 
        />
      </section>
    </>
  );
}

// Main Component with ErrorBoundary and Suspense
function AuthorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <AuthorTemplate />
      </ErrorBoundary>
    </Suspense>
  );
}

export default AuthorPage;

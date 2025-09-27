"use client";

import React, { Suspense, useMemo, useState, useRef, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Globalhero from "../../common/components/globalhero/index";
import { sdk } from "@lib/config";
import { useQueryData } from "@lib/hooks/useQueryData";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Loading from "app/[countryCode]/(main)/account/loading";
import { Pagination } from "@modules/store/components/pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductPreview from "@modules/products/components/product-preview";

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
        className="mt-6 bg-[#EA5900] text-white px-4 py-2 rounded-md hover:bg-[#EA5900]"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
}

// Helper function to truncate text
function truncateText(htmlString: string, maxLength: number) {
  if (htmlString.length <= maxLength) return htmlString;
  return htmlString.slice(0, maxLength) + "...";
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// AuthorTemplate Component
function AuthorTemplate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  const limit = 10;
  const page = Number(searchParams.get("page")) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Calculate offset based on the current page
  const offset = (page - 1) * limit;

  // Reset to page 1 when search term changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, router,]);

  // Fetch authors data using React Query
  const { data, isFetching } = useQueryData<AuthorsResponse>(
    ["authors", limit, offset, debouncedSearchTerm],
    () => {
      if (debouncedSearchTerm) {
        return sdk.client.fetch(`/store/authors/search`, {
          query: { query: debouncedSearchTerm, limit, offset },
        });
      } else {
        return sdk.client.fetch(`/store/authors`, {
          query: { limit, offset },
        });
      }
    },
    true,
    {
      queryKey: [`author`, limit, offset, debouncedSearchTerm],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const { author: authors = [], count = 0 } = data || {};
  const pageNumber = page ? page : 1;
  const totalPages = Math.ceil(count / limit);

  return (
    <>
      <Globalhero
        backgroundImage="/banner.jpg"
        title="Authors"
        subtitle="Authors are the silent magicians of the mind—crafting worlds from words, stirring souls with sentences, and leaving entire universes between the covers of a book"
      />
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Our <span className="text-orange-400">Authors</span>
            </h2>
            <p className="text-gray-600 mt-2">
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Authors Grid */}
          {isFetching ? (
            <div className="text-center py-8">
              <p>Loading authors...</p>
            </div>
          ) : authors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {debouncedSearchTerm
                  ? "No authors found for your search."
                  : "No authors available at the moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-10">
              {authors.map((author) => (
                <div key={author.id} className="bg-white shadow-md rounded-lg overflow-hidden" data-testid="author-card">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2 sm:p-6 flex flex-col justify-between h-[50%] ">
                    <h3 className="text-sm font-semibold text-blue-950 sm:text-lg line-clamp-1 sm:line-clamp-1">
                      {author.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-2 mt-1 mb-3">
                      {author.subText}
                    </p>
                    <LocalizedClientLink
                      href={`/authors/${author.id}`}
                      className="bg-[#EA5900] text-white text-xs sm:text-sm px-2 py-2 text-center rounded-sm hover:bg-[#EA5900]"
                    >
                      View Profile
                    </LocalizedClientLink>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <Pagination
            page={pageNumber}
            totalPages={totalPages}
          />
        )}
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
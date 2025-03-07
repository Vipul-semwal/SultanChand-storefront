"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@lib/context/modal-context";
import { Input } from "@medusajs/ui";
import { Search, User, Barcode } from "lucide-react";
// import { useDebounce } from "@lib/hooks/useDebounce";
import { useQueryData } from "@lib/hooks/useQueryData";
import { listProductsWithSort } from "@lib/data/products";
import { string } from "zod";
import { useMemo } from "react";

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (value === debouncedValue) return; // Avoid redundant updates
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, debouncedValue]);

  return debouncedValue;
};

const SearchBar = () => {
  const router = useRouter();
  const { countryCode } = useParams();
  const { close } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const queryKey = useMemo(
    () => debouncedQuery ? ["search-products", debouncedQuery, searchType] : [],
    [debouncedQuery, searchType]
  );
  
  const { data, isFetching } = useQueryData(
    queryKey ,
    async () => {
      if(debouncedQuery == " "){
        return  { products: [] }
      }
      const { response } = await listProductsWithSort({
        page: 1,
        queryParams: { q: debouncedQuery },
        sortBy: "created_at",
        countryCode: typeof countryCode === "string" ? countryCode : "",
      });
      return response;
    },
    !!debouncedQuery, // Only fetch if there's input
    {
      queryKey ,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
  console.log('supersayiian mode:',data)

  interface SearchParams {
    q: string;
    searchby?: string;
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const params: SearchParams = { q: searchQuery };
    if (searchType) params.searchby = searchType;

    close();
    router.push(`/${countryCode}/store?${new URLSearchParams(params as any).toString()}`);
  };

  useEffect(() => {
    if (debouncedQuery) setShowSuggestions(true);
  }, [debouncedQuery]);

  return (
    <div className="relative flex justify-center items-center w-full z-20">
      <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
        <div className="relative w-full">
          

          <div className="absolute left-3 inset-y-0 flex items-center z-10">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className=" pr-6 text-xs max-w-full   inline-block bg-transparent  border-none "
            >
              <option value="">All</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
            </select>
            {/* {searchType === "author" && <User className="w-4 h-4 ml-2 text-gray-500" />} */}
            {/* {searchType === "isbn" && <Barcode className="w-4 h-4 ml-2 text-gray-500" />} */}
          </div>

          <input
            type="search"
            id="search"
            placeholder="Search.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-4 pl-24 text-sm text-gray-900 bg-[#FFF8EE] border-none rounded-sm focus:ring-orange-500 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="absolute right-2 bottom-[10px] bg-orange-600 top-3 text-white text-xs rounded-sm px-1 py-1 hover:bg-orange-800"
            disabled={!searchQuery.trim()}
          >
            Search
          </button>
        </div>
      </form>

      {showSuggestions && data?.products && data.products.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-lg mt-2 max-h-80 overflow-y-auto z-20 border border-gray-200 overflow-hidden overflow-x-hidden">
          {isFetching ? (
            <div className="p-4 text-sm text-gray-500">Loading...</div>
          ) : (
            data.products.slice(0, 10).map((product) => (
              <div
                key={product.id}
                className="flex items-center p-3 hover:bg-orange-100 cursor-pointer transition-transform duration-300 ease-in-out transform "
                onClick={() => {
                  close();
                  router.push(`/${countryCode}/products/${product.handle}`);
                }}
              >
                <img
                  src={product?.images?.[0]?.url as string || undefined}
                  alt={product.title}
                  className="w-14 h-14 object-cover rounded-lg mr-4 shadow-sm"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{product.title}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.handle}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default SearchBar;

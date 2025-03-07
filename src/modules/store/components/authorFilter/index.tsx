"use client";
import { useState, useEffect, useMemo } from "react";
import { useQueryData } from "@lib/hooks/useQueryData";
import { useRouter, useParams } from "next/navigation";
import { List, Loader2, Users } from "lucide-react";
import { sdk } from "@lib/config";

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

const AuthorFilter = () => {
  const router = useRouter();
  const { countryCode } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch authors using useQueryData hook
  const { data, isFetching } = useQueryData<AuthorsResponse>(
     ["authorsFilter",],
     () =>
       sdk.client.fetch(`/store/authors`, {
         query: {limit:52,offset:0 },
       }),
       true,  
     { 
       queryKey: [`authorsFilter`],
       staleTime: 5 * 60 * 1000, 
       refetchOnWindowFocus: false,
       retry: 1,
     }
 
   );

  const authors = useMemo(() => data?.author || [], [data]);

  const handleAuthorClick = (name:string) => {
    router.push(`/${countryCode}/store?searchby=author&q=${name}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        className="flex items-center px-4 py-2 bg-[#EA5900] text-white text-sm rounded-md hover:bg-[#D44E00]"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <Users className="w-4 h-4 mr-2" /> Filter by Author
      </button>

      {showDropdown && (
        <div className="absolute bottom-3/4 bottom- mt-2 w-64 bg-white shadow-lg rounded-md max-h-80 overflow-y-auto z-50">
          {isFetching ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin w-5 h-5 text-[#EA5900]" />
            </div>
          ) : (
            authors.map((author) => (
              <div
                key={author.id}
                className="px-4 py-2 cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => handleAuthorClick(author.name)}
              >
                {author.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorFilter;

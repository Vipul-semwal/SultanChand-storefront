import { useQueryData } from "@lib/hooks/useQueryData";
import { listCategories } from "@lib/data/categories";
import { HttpTypes } from "@medusajs/types";

export const useCategories = (query?: Record<string, any> | null) => {
  return useQueryData<HttpTypes.StoreProductCategory[]>(
    ["categories", query], 
    () => listCategories(query || {}), 
    true,
    { 
      queryKey: [`categories`],
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
      retry: 1,
    }

  );
};

import { useQueryData } from "./useQueryData";
import { listProducts } from "@lib/data/products";

export const useProductData = (countryCode: string, handle: string,run:boolean) => {
  return useQueryData(
    ["product", countryCode, handle], // Unique cache key
    async () => {
      const { response } = await listProducts({
        countryCode,
        queryParams: { handle },
      });

      if (!response?.products?.length) {
        throw new Error("No product found!");
      }

      return response.products[0]; // Return first product
    },
    run, // Enable query by default
  );
};

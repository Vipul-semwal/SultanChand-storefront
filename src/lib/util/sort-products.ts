import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

interface MinPricedProduct extends HttpTypes.StoreProduct {
  _minPrice?: number
}

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
): HttpTypes.StoreProduct[] {
  let sortedProducts = products as MinPricedProduct[];

  if (["price_asc", "price_desc"].includes(sortBy)) {
    sortedProducts.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product._minPrice = Math.min(
          ...product.variants.map(
            (variant) => variant?.calculated_price?.calculated_amount ?? Infinity
          )
        );
      } else {
        product._minPrice = Infinity;
      }
    });

    sortedProducts.sort((a, b) => {
      const diff = (a._minPrice ?? Infinity) - (b._minPrice ?? Infinity);
      return sortBy === "price_asc" ? diff : -diff;
    });
  }

  if (sortBy === "created_at") {
    sortedProducts.sort((a, b) => {
      return (
        new Date(b.created_at ?? "").getTime() -
        new Date(a.created_at ?? "").getTime()
      );
    });
  }

  if (sortBy === "name_asc") {
    sortedProducts.sort((a, b) =>
      (a.title ?? "").localeCompare(b.title ?? "")
    );
  }

  if (sortBy === "name_desc") {
    sortedProducts.sort((a, b) =>
      (b.title ?? "").localeCompare(a.title ?? "")
    );
  }

  return sortedProducts;
}



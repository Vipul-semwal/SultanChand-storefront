import { HttpTypes } from "@medusajs/types";

export interface ProductCategoryTypes {
  id: string;
  name: string;
  handle: string;  
  path: string;
  category_children?: ProductCategoryTypes [];
}

export function transformProductCategory(cat: HttpTypes.StoreProductCategory): ProductCategoryTypes {
  return {
    id: cat.id,
    name: cat.name,
    handle: cat.handle,
    path: `/categories/${encodeURIComponent(cat.handle)}?handle=${encodeURIComponent(cat.handle)}`,
    category_children: cat.category_children?.map(transformProductCategory),
  };
}


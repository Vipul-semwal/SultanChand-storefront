import { HttpTypes } from "@medusajs/types";

export interface ProductCategoryTypes {
  id: string;
  name: string;
  handle: string;  
  path: string;
  category_children?: ProductCategoryTypes [];
}

export function transformProductCategory(cat: HttpTypes.StoreProductCategory): ProductCategoryTypes{
    // console.log('yaaya are ', cat)
  return {
    id: cat.id,
    name: cat.name,
    handle: cat.handle,
    path: `/categories/${cat.handle}?handle=${cat.handle}`,
    category_children: cat.category_children?.map(transformProductCategory),
  };
}

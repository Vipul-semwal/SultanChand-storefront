import { HttpTypes } from "@medusajs/types";
import { listCollections } from "@lib/data/collections";

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
};

export async function trasnformCollection():Promise<ProductCategoryTypes[] | []> {
  const { collections } = await listCollections({ fields: "*products" });
  if(collections && collections.length > 0){
   return collections.slice(0, 4).map((collection) => {
            return {
              id: collection.id,
              name: collection.title,
              handle: collection.handle,
              path:`/collections/${collection.handle}`
            }
    }) 
  }
  else return []
}


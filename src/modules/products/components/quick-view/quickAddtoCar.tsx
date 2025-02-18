import { useState, useMemo } from "react";
import { addToCart } from "@lib/data/cart";
import { isEqual } from "lodash";
import { HttpTypes } from "@medusajs/types";
import {  toast } from "@medusajs/ui";


const getValidVariant = (product:HttpTypes.StoreProduct) => {
  if (!product?.variants?.length) return null;

  return product.variants.find((variant) => {
    if (!variant.manage_inventory) return true; // Always available if inventory is not managed
    if (variant.allow_backorder) return true; // Available if backorders are allowed
    return (variant.inventory_quantity || 0) > 0; // Available if stock > 0
  }) || null;
};

const QuickAddToCart = ({ product,countryCode,cb }:{product:HttpTypes.StoreProduct,countryCode:string,cb?:()=>void}) => {
  const [isAdding, setIsAdding] = useState(false);

  // Find a valid variant
  const validVariant = useMemo(() => getValidVariant(product), [product]);

  const handleAddToCart = async () => {
    if (!validVariant?.id) return;
    setIsAdding(true);

    await addToCart({
      variantId: validVariant.id,
      quantity: 1,
      countryCode,
    });

    setIsAdding(false);
    toast.success("Product added to cart")

    if(cb){
      cb()
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={!validVariant || isAdding}  className="bg-orange-600 text-gray-200 py-2 rounded-lg text-sm hover:bg-orange-700 transition-all">
      {isAdding ? "Adding..." : !validVariant ? "Out of stock" : "Quick Add"}
    </button>
  );
};

export default QuickAddToCart;

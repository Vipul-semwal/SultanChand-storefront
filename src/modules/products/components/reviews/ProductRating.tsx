"use client";
import React from "react";
import { fetchReviewsAction } from "../../../../actions/product";
import { useQueryData } from "../../../../lib/hooks/useQueryData";
import clsx from "clsx";

interface ProductRatingProps {
  productId: string;
  fontSize?: "small" | "medium" | "large"; // Font size for the rating
  customClasses?: string; // Additional custom CSS classes
  showDetails?: boolean; // Controls whether to show rating details
}

interface Review {
  id: string;
  name: string;
  comment: string;
  email: string;
  rating: number;
  created_at: string;
}

interface ReviewsResponse {
  data: Review[];
  averageRating: number;
  totalReviews: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({
  productId,
  fontSize = "medium", // Default to "medium"
  customClasses = "", // Default to empty string
  showDetails = true, // Default to showing details
}) => {
  // Use the custom hook to fetch and cache data
  const {
    data: reviewsData,
    isPending,
    isError,
  } = useQueryData<ReviewsResponse>(
    ["reviews", productId], // Query key for caching
    () => fetchReviewsAction(productId), // Query function,
true,
{ 
  queryKey: ["reviews", productId],
  staleTime: 5 * 60 * 1000, 
  refetchOnWindowFocus: false,
  retry: 1,
}
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || !reviewsData) {
    return <div>Failed to load reviews.</div>;
  }

  const { averageRating, totalReviews } = reviewsData;

  // Dynamically change font size based on the prop value
  const ratingFontSize = clsx({
    "text-sm": fontSize === "small",
    "text-base": fontSize === "medium",
    "text-xl": fontSize === "large",
  });

  return (
    <div
      className={clsx(
        "flex gap-1 items-center bg-white rounded-md max-w-xs mx-auto w-full",
        customClasses
      )}
    >
      {/* Star Rating */}
      <div className="flex justify-start space-x-2">
        <div className="text-yellow-400">
          {"★".repeat(Math.round(averageRating))}
          {"☆".repeat(5 - Math.round(averageRating))}
        </div>

        {/* Conditional rendering for details */}
        {showDetails && (
          <span className={clsx(ratingFontSize, "font-semibold")}>
            {averageRating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Total Reviews */}
      {showDetails && (
        <div className="text-gray-600 text-sm">
          <span>{totalReviews} Reviews</span>
        </div>
      )}
    </div>
  );
};

export default ProductRating;

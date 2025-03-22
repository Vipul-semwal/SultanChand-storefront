"use client";

import React, { useState, useEffect } from "react";
import { useQueryData } from "../../../../lib/hooks/useQueryData";
import { sdk } from "@lib/config";
import SideStars from "./sideStars"; // Import the SideStars component
import Modal from "@modules/common/components/modal";
import { FaStar } from "react-icons/fa";
import { formatDate } from "@lib/util/strapi"; // Assuming this is your date formatter function

export interface Review {
  comment: string;
  created_at: string;
  deleted_at: string | null;
  email: string;
  id: string;
  name: string;
  product_id: string;
  rating: number;
  updated_at: string;
}

export interface ReviewsResponse {
  data: Review[];
  count: Number;
  limit: Number;
  offset: Number;
}

const ProductReviews = ({ productId }: { productId: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const limit = 10;

  const fetchReviews = async (currentOffset: number) => {     
    const queryParams = new URLSearchParams({
      productId: productId,
      offset: currentOffset.toString(),
      limit: limit.toString(),
    }).toString();

    return sdk.client.fetch<ReviewsResponse>(`/store/review?${queryParams}`, {
      method: "GET",
    });
  };

  const { data, isPending, isError, refetch } = useQueryData(
    ["productReviews", productId],
    () => fetchReviews(0) // Fetch the initial set of reviews with offset = 0,
    ,
    true,
    {
      queryKey: ["productReviews", productId],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  useEffect(() => {
    if (data) {
      setReviews(data.data); // Set initial reviews
    }
  }, [data]);

  const loadMoreReviews = async () => {
    setIsLoadingMore(true);
    const nextOffset = offset + limit;
    try {
      const response = await fetchReviews(nextOffset);
      setReviews((prev) => [...prev, ...response.data]); // Append new reviews
      setOffset(nextOffset); // Update offset
    } catch (error) {
      console.error("Failed to load more reviews:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Function to extract initials from the reviewer's name
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join(" ")
      .slice(0, 2); // Return first 2 initials
  };

  // Calculate the average rating
  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  if (isPending) {
    return <p>Loading reviews...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load reviews.{" "}
        <button onClick={() => refetch()} className="text-blue-950 underline">
          Retry
        </button>
      </p>
    );
  }

  return (
    <div className="max-w-full mx-auto p-6 bg-white ">
      <h2 className="text-xl font-bold mb-4">Product Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Right Section: Average Rating and Breakdown */}
        <div className="col-span-1 md:col-span-4">
          <SideStars averageRating={averageRating} reviews={reviews} prouduct_id={productId} />
        </div>

        {/* Left Section: Reviews with Profiles and Stars */}
        <div className="col-span-1 md:col-span-8 ">
          {reviews.length > 0 ? (
            <>
              <ul className="space-y-3">
                {reviews.slice(0, 5).map((review) => (
                  <li key={review.id} className="p-3  shadow-md bg-white-50 flex justify-between">
                    <div className="flex flex-col w-3/4">
                      <div className="flex items-center mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={`w-4 h-4 ${index < review.rating ? "text-yellow-300" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {/* Display Reviewer's Profile Initials */}
                        <div className="w-8 h-8 bg--[#EA5900]500 text-white flex items-center justify-center rounded-full">
                          {getInitials(review.name)}
                        </div>
                        <p className="text-xs text-gray-500">- {review.name}</p>
                      </div>
                    </div>

                    {/* Date Placeholder */}
                    <div className="flex flex-col justify-between items-end">
                      <p className="text-xs text-gray-400">
                        {formatDate(review.created_at)} {/* Format the created_at date */}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {reviews.length > 3 && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 flex items-center justify-center gap-3 bg-orange text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-orange-600 hover:shadow-md hover:scale-100 focus:ring-2 focus:ring-orange-500 mt-2"
                >
                  Read All Reviews
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center flex-col">
              <img src="/review.png" className="max-w-xs sm:max-w-sm mt-2 sm:mt-0 " alt="" />
              <p className="text-gray-500 text-sm sm:text-xl">No reviews for this product yet.</p>
            </div>



          )}
        </div>
      </div>

      {/* Modal for All Reviews */}
      <Modal isOpen={isModalOpen} close={() => setModalOpen(false)} size="large">
        <Modal.Title>All Reviews</Modal.Title>
        <Modal.Body>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {reviews.map((review) => (
              <div key={review.id} className="p-3  rounded-lg shadow-sm bg-gray-50">
                <div className="flex items-center mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`w-4 h-4 ${index < review.rating ? "text-yellow-300" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  {/* <span className="ml-2 text-xs text-gray-500">{review.email}</span> */}
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {/* Display Reviewer's Profile Initials */}
                  <div className="w-8 h-8 bg--[#EA5900]500 text-white flex items-center justify-center rounded-full">
                    {getInitials(review.name)}
                  </div>
                  <p className="text-xs text-gray-500">- {review.name}</p>
                </div>

                {/* Date in Modal */}
                <div className="flex flex-col justify-between items-end mt-2">
                  <p className="text-xs text-gray-400">
                    {formatDate(review.created_at)} {/* Format the created_at date */}
                  </p>
                </div>
              </div>
            ))}
            {reviews.length % limit === 0 && reviews.length >= limit && (
              <div className="text-center mt-4">
                <button
                  onClick={loadMoreReviews}
                  className="px-4 py-2 flex items-center justify-center gap-3 bg-blue-950 text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-[#338be5] hover:shadow-md hover:scale-100 focus:ring-2 focus:ring-blue-500"

                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductReviews;

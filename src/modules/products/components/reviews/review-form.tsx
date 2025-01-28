"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@medusajs/ui";
import { useMutationData } from "../../../../lib/hooks/useMutationData";
import { sdk } from "@lib/config";
import { rest } from "lodash";

// Define the schema with Zod
const reviewSchema = z.object({
  rating: z.number().min(1, "Please provide a rating").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters long"),
  prouduct_id: z.string().min(1, "Book ID is required"),
  email: z.string().email("Please provide a valid email address"),
  name: z.string().min(1, "Name is required"),
});

type ReviewFormInputs = z.infer<typeof reviewSchema>;

// Star rating component
const StarRating = ({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ProductReviewForm = ({ prouduct_id }: { prouduct_id: string }) => {
  const [starRating, setStarRating] = useState(0);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReviewFormInputs>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      prouduct_id,
      email: "",
      name: "",
    },
  });

  // Using the custom mutation hook
  const fetch = async (data:ReviewFormInputs)=>{
    const response:any = await sdk.client.fetch("/store/review", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.errors) {
        throw new Error("Something went wrong");
      }
       
      return response;
  }
  const { mutate, isPending } = useMutationData(
    ["submitReview"],
    async (reviewData: ReviewFormInputs) => {
      // Replace this with your actual API endpoint
       const res =  await fetch(reviewData);
       return res;
    },
      ["productReviews",prouduct_id],
    ()=>{
        toast.success("Info", {
            description: "Review added successfully",
          })
       reset()
    }
  );

  const onSubmit = (data: ReviewFormInputs) => {
    mutate(data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your name"
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your email"
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <StarRating
                rating={starRating}
                onChange={(value) => {
                  setStarRating(value);
                  setValue("rating", value);
                  field.onChange(value);
                }}
              />
            )}
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-1">Comment</label>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your review here..."
              />
            )}
          />
          {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md transition ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ProductReviewForm;

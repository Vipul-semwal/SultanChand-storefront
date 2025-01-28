import { sdk } from "@lib/config";

export interface Review {
  id: string;
  name: string;
  comment: string;
  email: string;
  rating: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product_id: string;
}

export interface ReviewsResponse {
  data: Review[];
  averageRating: number;
  totalReviews: number;
}

export async function fetchReviewsAction(productId: string): Promise<ReviewsResponse> {
  try {
    const response = await sdk.client.fetch<ReviewsResponse>(`/store/review/${productId}`, {
      method: "GET",
    });

    const reviews = response?.data ?? [];

   
    return {
      data: reviews,
      averageRating: response.averageRating,
      totalReviews:response.totalReviews
    };
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
}

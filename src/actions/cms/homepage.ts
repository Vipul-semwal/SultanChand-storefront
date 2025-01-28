import axios from "axios";

// Define the type for the API response
interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageResponse {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Function to fetch banner images
export async function fetchBannerImages(): Promise<string[]> {
    console.log('lund')
  try {
    const response = await axios.get<ImageResponse[]>(
      "http://localhost:1337/api/upload/files",
      {
        params: {
          "filters[caption]": "banner",
        },
      }
    );

    console.log('imggggg',response)
    const imageUrls: string[] = response.data.map((image: ImageResponse): string => image.url);
   

    return imageUrls;
  } catch (error) {
    console.error("Error fetching banner images:", error);
    throw error;
  }
}
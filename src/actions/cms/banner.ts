import {  GalleryImage, GalleryResponse,GalleryListItem,GetGallryDataTypes } from '../../lib/types/gallery'; // Import types
import { BannerResponse } from '@lib/types/banner';
import axios from 'axios';
const GetallBanneresurl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`
const GetGalleryDataUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/galleries`


interface Request {
  page?: number;
  pageSize: number;
  sort?: string;
}


export async function GetAllBanner( ): Promise<{status:number,data:string,message?:string}> {
  try {
  
    // API Call to get all galleries
    const response = await axios.get<BannerResponse>(GetallBanneresurl, {
      params: {
        "pagination[page]": 1,
        "pagination[pageSize]": 1,
        sort: "createdAt:asc",
      },
    });



    // Map API data to simplified gallery list items
    const bannerimg = response.data.data.map((data) => ({
     img:data.img
    }));

    // Return simplified data and pagination info
    return { status: 200, data: response.data.data[0].img[0].url };
  } catch (error: unknown) {
    console.error("Error fetching galleries:", (error as Error).message);

    return { status: 400, message: "Failed to fetch galleries",data:"" };
  }
}


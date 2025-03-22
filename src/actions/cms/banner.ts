import {  GalleryImage, GalleryResponse,GalleryListItem,GetGallryDataTypes } from '../../lib/types/gallery'; 
import { BannerResponse } from '@lib/types/banner';
import axios from 'axios';
const GetallBanneresurl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/banners?populate=*`


interface Request {
  page?: number;
  pageSize: number;
  sort?: string;
};


export async function GetAllBanner( ): Promise<{status:number,data:{img:string}[] | [],message?:string}> {
  try {
  
    // API Call to get all galleries
    const response = await axios.get<BannerResponse>(GetallBanneresurl, {
      params: {
        "pagination[page]": 1,
        "pagination[pageSize]": 3,
        sort: "createdAt:asc",
      },
    });



    // Map API data to simplified gallery list items
    const bannerimg = response.data.data.map((data) => ({
     img: data.img[0]?.url, // Assuming img is an array and you want the first URL
    }));

    // Return simplified data and pagination info
    return { status: 200, data: bannerimg.length > 0 ? bannerimg : [], message: "Success" };
  } catch (error: unknown) {
    console.error("Error fetching banner:", (error as Error).message);

    return { status: 400, message: "Failed to fetch galleries",data:[] };
  }
};


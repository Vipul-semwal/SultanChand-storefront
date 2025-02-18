import {  GalleryImage, GalleryResponse,GalleryListItem,GetGallryDataTypes } from '../../lib/types/gallery'; // Import types
import axios from 'axios';
const GetallGalleriesurl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/galleries?populate=*`
const GetGalleryDataUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/galleries`


interface Request {
  page?: number;
  pageSize: number;
  sort?: string;
}


export async function GetAllGalleries({ page, pageSize, sort }: Request): Promise<any> {
  try {
    // Extract query parameters with default values
    const pageNumber: number = page || 1;
    const pageSizeNumber: number = pageSize || 10;
    const sortOrder: string = sort || "createdAt:asc";

    // API Call to get all galleries
    const response = await axios.get<GalleryResponse>(GetallGalleriesurl, {
      params: {
        "pagination[page]": pageNumber,
        "pagination[pageSize]": pageSizeNumber,
        sort: sortOrder,
      },
    });



    console.log('response:',response)

    // Map API data to simplified gallery list items
    const galleries: GalleryListItem[] = response.data.data.map((gallery) => ({
      id: gallery.id,
      documentId: gallery.documentId,
      title: gallery.Title || 'Untitled Gallery',
      description: gallery.description,
      thumbnailUrl: gallery.galleryImages[0]?.formats?.thumbnail?.url || '', 
      date: gallery.date
    }));

    // Return simplified data and pagination info
    return { status: 200, data: galleries, meta: response.data.meta.pagination };
  } catch (error: unknown) {
    console.error("Error fetching galleries:", (error as Error).message);

    return { status: 400, message: "Failed to fetch galleries" };
  }
}

export async function GetGalleryData(documentId: string): Promise<{ status: number; data?: GalleryResponse; message?: string }> {
  try {

    const response = await axios.get<GalleryResponse>(GetGalleryDataUrl, {
      params: {
        "filters[documentId][$eqi]": documentId,
        populate: "*",
      },
    });

    console.log('specifcdata',response.data);
    return { status: 200, data: response.data };
  } catch (error: unknown) {
    console.error("Error fetching gallery data:", (error as Error).message);

  
    return { status: 400, message: "Failed to fetch gallery data" };
  }
}

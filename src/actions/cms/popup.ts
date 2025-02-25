import { DataItem, ApiResponse } from "../../lib/types/popup";
import axios from 'axios';

const GetAllPopupsUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/popups?populate=*`;
const GetPopupDataUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/popups`;

interface Request {
  page?: number;
  pageSize: number;
  sort?: string;
}

export async function GetAllPopups({ page, pageSize, sort }: Request): Promise<{ status: number; data?: DataItem[]; meta?: ApiResponse['meta']; message?: string }> {
  try {
    // Extract query parameters with default values
    const pageNumber: number = page || 1;
    const pageSizeNumber: number = pageSize || 10;
    const sortOrder: string = sort || 'createdAt:asc';

    // API Call to get all popups
    const response = await axios.get<ApiResponse>(GetAllPopupsUrl, {
      params: {
        "pagination[page]": pageNumber,
        "pagination[pageSize]": pageSizeNumber,
        sort: sortOrder,
      },
    });

    console.log('responsePopup:', response);

    // Map API data to simplified popup items
    const popups: DataItem[] = response.data.data.map((popup) => ({
      id: popup.id,
      documentId: popup.documentId,
      link: popup.link,
      createdAt: popup.createdAt,
      updatedAt: popup.updatedAt,
      publishedAt: popup.publishedAt,
      popuBanner: popup.popuBanner,
    }));

    return { status: 200, data: popups, meta: response.data.meta };
  } catch (error: unknown) {
    console.error('Error fetching popups:', (error as Error).message);

    return { status: 400, message: 'Failed to fetch popups' };
  }
}

export async function GetPopupData(documentId: string): Promise<{ status: number; data?: DataItem; message?: string }> {
  try {
    // API Call to get specific popup by documentId
    const response = await axios.get<ApiResponse>(GetPopupDataUrl, {
      params: {
        "filters[documentId][$eqi]": documentId,
        populate: '*',
      },
    });

    console.log('specificPopupData:', response.data);

    if (response.data.data.length === 0) {
      return { status: 404, message: 'Popup not found' };
    }

    return { status: 200, data: response.data.data[0] };
  } catch (error: unknown) {
    console.error('Error fetching popup data:', (error as Error).message);

    return { status: 400, message: 'Failed to fetch popup data' };
  }
}

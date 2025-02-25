// actions/cms/advertisement.ts

import axios from 'axios';
import { Advertisement, AdvertisementResponse } from '../../lib/types/runningad';

const GetAllAdvertisementsUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/advertisements?populate=*`;
const GetAdvertisementDataUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/advertisements`;

interface Request {
  page?: number;
  pageSize?: number;
  sort?: string;
}

// Fetch all advertisements with pagination and sorting
export async function GetAllAdvertisements({
  page = 1,
  pageSize = 10,
  sort = 'createdAt:desc',
}: Request): Promise<{ status: number; data?: Advertisement[]; meta?: AdvertisementResponse['meta']; message?: string }> {
  try {
    const response = await axios.get<AdvertisementResponse>(GetAllAdvertisementsUrl, {
      params: {
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        sort,
      },
    });

    const advertisements: Advertisement[] = response.data.data.map((ad) => ({
      id: ad.id,
      documentId: ad.documentId,
      text: ad.text,
      link: ad.link,
      createdAt: ad.createdAt,
      updatedAt: ad.updatedAt,
      publishedAt: ad.publishedAt,
    }));

    return { status: 200, data: advertisements, meta: response.data.meta };
  } catch (error: unknown) {
    console.error('Error fetching advertisements:', (error as Error).message);
    return { status: 400, message: 'Failed to fetch advertisements' };
  }
}

// Fetch a specific advertisement by documentId
export async function GetAdvertisementData(documentId: string): Promise<{ status: number; data?: Advertisement; message?: string }> {
  try {
    const response = await axios.get<AdvertisementResponse>(GetAdvertisementDataUrl, {
      params: {
        "filters[documentId][$eqi]": documentId,
        populate: "*",
      },
    });

    if (response.data.data.length === 0) {
      return { status: 404, message: 'Advertisement not found' };
    }

    return { status: 200, data: response.data.data[0] };
  } catch (error: unknown) {
    console.error('Error fetching advertisement data:', (error as Error).message);
    return { status: 400, message: 'Failed to fetch advertisement data' };
  }
}

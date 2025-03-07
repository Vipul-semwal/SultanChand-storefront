import { PdfResponse,PdfData,PdfSummary,Pagination} from "@lib/types/catalogs";
import axios from 'axios';

const GetAllCatalogUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/catalogs?populate=*`;
const GetcatalogsUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/catalogss`;

interface RequestProp {
  page?: number;
  pageSize: number;
  sort?: string;
};


export async function GetAllcatalogs({ page, pageSize, sort }: RequestProp): Promise<{ status: number; data?: PdfSummary[]; meta?: Pagination; message?: string }> {
  try {
    // Extract query parameters with default values
    const pageNumber: number = page || 1;
    const pageSizeNumber: number = pageSize || 25;
    const sortOrder: string = sort || 'createdAt:asc';

    // API Call to get all popups
    const response = await axios.get<PdfResponse>(GetAllCatalogUrl, {
      params: {
        "pagination[page]": pageNumber,
        "pagination[pageSize]": pageSizeNumber,
        sort: sortOrder,
      },
    });

    console.log('responsePopup:', response);

    // Map API data to simplified popup items
    const  PdfData = response.data.data.map((pdf: PdfData) => ({
      id: pdf.id,
     title: pdf.title,
     url:pdf.pdf.url
    }));

    return { status: 200, data:PdfData, meta: response.data.meta.pagination };
  } catch (error: unknown) {
    console.error('Error fetching catlogs:', (error as Error).message);

    return { status: 400, message: 'Failed to fetch catalog' };
  }
}
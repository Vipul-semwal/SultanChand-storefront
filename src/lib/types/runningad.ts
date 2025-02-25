export interface Advertisement {
    id: number;
    documentId: string;
    text: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface AdvertisementPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  export interface AdvertisementResponse {
    data: Advertisement[];
    meta: {
      pagination: AdvertisementPagination;
    };
  }
  
export type BannerFormat = {
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
  };
  
  export type PopuBanner = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      large?: BannerFormat;
      small?: BannerFormat;
      medium?: BannerFormat;
      thumbnail?: BannerFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  
  export type DataItem = {
    id: number;
    documentId: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    popuBanner: PopuBanner;
  };
  
  export type ApiResponse = {
    data: DataItem[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };

  export type pagination = {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number,
}
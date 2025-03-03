// Pagination type
export type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  
  // Image format type
  export type ImageFormat = {
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
  
  // Image formats collection
  export type BannerImageFormats = {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  
  // Banner image type
  export type BannerImage = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: BannerImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  
  // Single banner item type
  export type BannerItem = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    img: BannerImage[];
  };
  
  // Banner response type
  export type BannerResponse = {
    data: BannerItem[];
    meta: {
      pagination: Pagination;
    };
  };
  
  // Simplified banner list item for display
  export type BannerListItem = {
    id: number;
    documentId: string;
    imageUrl: string;
    title: string;
    description: string;
    createdAt: string;
  };
  
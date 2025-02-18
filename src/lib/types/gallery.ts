export type pagination = {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number,
}

export type GalleryImageFormats = {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  
export  type ImageFormat = {
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
  
 export type GalleryImage = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: GalleryImageFormats;
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
  
 export type GalleryResponse = {
    data: Array<{
      id: number;
      documentId: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      Title: string | null;
      galleryImages: GalleryImage[];
    }>;
    meta:{
        pagination:pagination
    }
  };

  export type GetGallryDataTypes = {
    data: Array<{
      id: number;
      documentId: string;
      date: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      Title: string | null;
      galleryImages: GalleryImage[];
    }>;
    meta:{
        
    }
  };
  
  export interface GalleryListItem {
    id: number;
    documentId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    date:string
  }
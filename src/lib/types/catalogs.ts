export interface PdfResponse {
    data: PdfData[];
    meta: Meta;
  }
  
  export interface PdfData {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    pdf: PdfDetails;
  }
  
  export interface PdfDetails {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: any | null; // If formats have a defined structure, replace 'any' with a specific type
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null; // Replace 'any' if metadata has a specific structure
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface Meta {
    pagination: Pagination;
  }
  
  export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  export interface PdfSummary {
    id: number;
    title: string;
    url: string;
  }
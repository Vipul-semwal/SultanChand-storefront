  interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  interface CoverFormats {
    large?: {
      url: string;
    };
    small?: {
      url: string;
    };
    medium?: {
      url: string;
    };
    thumbnail?: {
      url: string;
    };
  }
  
  interface Cover {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: CoverFormats;
    url: string;
  }
  
  interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string | null;
  }
  
  interface Author {
    id: number;
    documentId: string;
    name: string;
    email: string;
  }
  
  interface Block {
    __component: string;
    id: number;
    body?: string;
    title?: string;
    imageUrl?: string;
    quoteBody?: string; 
    quoteAuthor?: string; 
    media?: string; 
    sliderImages?: string[];
  }
  
 export interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover?: Cover;
    author: Author;
    category: Category;
    blocks?:Block[]
    
  }
  
  
  export interface BlogResponse {
    data: Article[];
    meta: {
    };
  }

  // info type for listing blogs
 export interface BlogListItem {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    thumbnail?: string;
    authorName: string;
    categoryName: string;
  }
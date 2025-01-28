import axios from "axios";
import { promises } from "dns";

const STRAPI_API_URL = "http://localhost:1337/api/articles?populate=*";
const GetBlogDataURl = "http://localhost:1337/api/articles"

// Request Interface
interface Request {
  page?:number;
  pageSize:number;
  sort?:string
}

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

interface ArticleAttributes {
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
}

interface Article {
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
}

interface Block {
  __component: string;
  id: number;
  body?: string;
  title?: string;
  imageUrl?: string;
  // You can expand this based on the specific component details
}

interface StrapiResponse {
  data: Article[];
  meta: {
    pagination: Pagination;
  };
}
interface BlogResponse {
    data: Article[];
    meta: {
      pagination: Pagination;
    };
  }

// Simplified Blog Type for Rendering
interface BlogListItem {
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

// Main Function
export async function GetAllBlogs({page,pageSize,sort}: Request): Promise<any> {
  try {
   
    // Extract query parameters with default values
    const pageNumber: number = page || 1;
    const pageSizeNumber: number = pageSize || 10;
    const sortOrder: string = sort || "createdAt:asc";

    // API Call
    const response = await axios.get<StrapiResponse>(STRAPI_API_URL, {
      params: {
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        sort,
      },
    });
    

    // Map API data to simplified blog list items
    const articles: BlogListItem[] = response.data.data.map((article) => ({
      id: article.id,
      documentId: article.documentId,
      title: article.title,
      description: article.description,
      slug: article.slug,
      createdAt: article.createdAt,
      thumbnail:
        article.cover?.formats?.thumbnail?.url ||
        article.cover?.url, // Fallback to main image URL
      authorName: article.author.name,
      categoryName: article.category.name,
    }));
    console.log('respone',articles)
    // Return only the simplified array of articles
    return { status: 200, data: articles }
  } catch (error: unknown) {
    console.error("Error fetching articles:", (error as Error).message);

    // Error handling
    return { status: 400 }
    
  }
};

export async function GetBlogData(slug: string):Promise<{status:Number,data?:BlogResponse,message?:string}> {
    try {
      const response = await axios.get(`http://localhost:1337/api/articles/?populate=*&filters[slug][$eqi]=${slug}`, {
      });
  
    console.log('daaaaaaaaaaaaaaaaaaaaaa',response.data)
     
  
      
      return { status: 200, data: response.data };
    } catch (error: unknown) {
      console.log('runned')
      // console.error("Error fetching article data:", (error as Error).message);
  
      // Error handling
      return { status: 400, message: "Failed to fetch article" };
    }
  }

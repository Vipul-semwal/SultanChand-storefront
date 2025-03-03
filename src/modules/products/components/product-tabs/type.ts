type Product = {
    id: string;
    book_content: BookContent;
  };
  
  export type ProductResponse = {
    data: Product[];
    message: string;
  };

  export type BookContent = {
    content: string;
    created_at: string;
    deleted_at: string | null;
    id: string;
    product_id: string;
    updated_at: string;
  }
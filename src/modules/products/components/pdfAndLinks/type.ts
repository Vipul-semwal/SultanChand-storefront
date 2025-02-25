export type ExtraLinksTypes = {
    amazoneLink: string | null;
    anypdf: Record<string, unknown> | null;
    created_at: string | null;
    deleted_at: string | null;
    id: string | null;
    previewPdf: string | null;
    questionBankPdf: string | null;
    updated_at: string | null;
    youtubeLink: string | null;
  };
  
 export type Author = {
    id: string;
    name: string;
    description: string;
    image: string;
    subText: string;
  };
  
  type Product = {
    id: string;
    extra_link: ExtraLinksTypes;
    author: Author;
  };
  
  export type ProductResponse = {
    data: Product[];
    message: string;
  };


  
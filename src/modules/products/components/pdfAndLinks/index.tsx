"use client"
import React from 'react';
import { FaYoutube, FaAmazon, FaFilePdf } from 'react-icons/fa';
import { useQueryData } from '@lib/hooks/useQueryData';
import { sdk } from '@lib/config';
import {ProductResponse,ExtraLinksTypes,Author,Product} from "./type"
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { HttpTypes } from '@medusajs/types';
import { string } from 'zod';

type Props = {
  product_id: string;
};

type ExtraLinks = {
  amazoneLink?: string;
  youtubeLink?: string;
  previewPdf?: string;
  questionBankPdf?: string;
  anypdf?: { label: string; url: string }[];
};
// type StoreProductAuthor = ProductResponse & {
//   author?: { id: string; name: string,image:string } | { id: string; name: string,image:string }[];
// };

// helper function to handle author data
function handleProductAuthor(product: Product) {
  if (!product.author) {
    console.log("No author assigned.");
    return;
  }

  if (Array.isArray(product.author)) {
    console.log("Multiple authors:");
   return  product.author.map((author) => {
          return {name: author.name,id:author.id,image:author.image}
   });
  } else {
    return [{name: product.author.name,id:product.author.id,image:product.author.image}];
  }
};

function PdfAndLinks({ product_id }: Props) {

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '1.5rem',
  };

  const linkStyle: React.CSSProperties = {
    color: '#0073e6',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const pdfIconColor = '#e74c3c';

  // logic part
  const extalinkCall = ()=>{
    return sdk.client.fetch<ProductResponse>(`/store/extralinks/${product_id}`,{
     method:"Get",
    })
   }
 
   const {data,isFetching,} = useQueryData<ProductResponse>(["extralinksandpdf",product_id],extalinkCall,true,{ 
    queryKey: ["extralinksandpdf",product_id],
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    retry: 1,
  })
   // console.table(data?.data[0].extra_link);
   const extraLinks = data?.data[0].extra_link as unknown as ExtraLinksTypes;
   const author = data?.data[0] ? handleProductAuthor( data?.data[0]) : [];
   console.log(' kichacki', author)

   const hasContent =
    extraLinks?.youtubeLink ||
    extraLinks?.amazoneLink ||
    extraLinks?.previewPdf ||
    extraLinks?.questionBankPdf ||
    (extraLinks?.anypdf && Object.entries(extraLinks.anypdf).length > 0) ||
    author;

    if (!hasContent) {
      return null;
    }
  return (
    <div style={containerStyle}>
       {(author ?? []).length > 0 && (
       author?.map((author, index) => (
        <div key={index} style={itemStyle}>
        <img src={author.image} alt={author.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        <div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{author.name}</p>
          {/* Use LocalizedClientLink instead of a regular <a> tag */}
          <LocalizedClientLink href={`/authors/${author.id}`} style={linkStyle}>
            More about the author
          </LocalizedClientLink>
        </div>
      </div>
      ))
    )}
      {extraLinks?.youtubeLink && (
        <div style={itemStyle}>
          <FaYoutube style={{ ...iconStyle, color: '#FF0000' }} />
          <a href={extraLinks.youtubeLink} style={linkStyle} target="_blank" rel="noopener noreferrer">
           Youtube link
          </a>
        </div>
      )}
      {extraLinks?.amazoneLink && (
        <div style={itemStyle}>
          <FaAmazon style={{ ...iconStyle, color: '#FF9900' }} />
          <a href={extraLinks.amazoneLink} style={linkStyle} target="_blank" rel="noopener noreferrer">
            Amazon Link
          </a>
        </div>
      )}
      {extraLinks?.previewPdf && (
        <div style={itemStyle}>
          <FaFilePdf style={{ ...iconStyle, color: pdfIconColor }} />
          <a href={extraLinks.previewPdf} style={linkStyle} target="_blank" rel="noopener noreferrer">
            Preview PDF
          </a>
        </div>
      )}
      {extraLinks?.questionBankPdf && (
        <div style={itemStyle}>
          <FaFilePdf style={{ ...iconStyle, color: pdfIconColor }} />
          <a href={extraLinks.questionBankPdf} style={linkStyle} target="_blank" rel="noopener noreferrer">
            Question Bank PDF
          </a>
        </div>
      )}
     {extraLinks?.anypdf && (
       <>
       {Object.entries(extraLinks.anypdf).map(([label, url], index) => (
         <div key={index} style={itemStyle}>
           <FaFilePdf style={{ ...iconStyle, color: pdfIconColor }} />
           {url ? (
             <a href={url as string | undefined} style={linkStyle} target="_blank" rel="noopener noreferrer">
               {label}
             </a>
           ) : (
             label
           )}
         </div>
       ))}
     </>
      )}
      
    </div>
  );
}

export default PdfAndLinks;

import { sdk } from "@lib/config";
interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
  };

  export default async function uploadFileWithSdk(file: File): Promise<UploadResult> {
    // console.log('filkadata:',file);
    try {
      // 1. Get pre-signed URL using Medusa SDK
      const response:any = await sdk.client.fetch('/store/upload', {
       method:"POST",
       body:{
        filename: file.name,
        ContentType: file.type,
       }
      })
  
      // console.log('filkaResponse:',response); 
  
      if (!response.success) {
        throw new Error(response.statusText || 'Failed to get pre-signed URL')
      }
  
      const { data } = response
      // console.log('chimtapdamam',data )
  
      // 2. Direct upload to S3 (still uses fetch as it's external)
      const uploadResponse = await fetch(data, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      // console.log('lunddigididi',uploadResponse)
  
      if (!uploadResponse.ok) throw new Error('S3 upload failed')
     
        // console.log('ulaodtos3:',uploadResponse);
      return {
        success: true,
        url: data.split('?')[0],
      }
    } catch (error) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
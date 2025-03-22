"use client"
import React from 'react';
import { useQueryData } from '@lib/hooks/useQueryData';
import { GetAllBanner } from 'actions/cms/banner';

function SecondBanner() {
  const { data, isFetching, isError } = useQueryData<{img:string}[] | []>( 
        ["2nd banner"], 
        async () => {
          const response = await GetAllBanner();
          if (response.status === 200 && response.data) {
            console.log('atafree hai',response)
            return response.data;
          } else {
            throw new Error(response.message || "Error fetching 2nd banner data");
          }
        },
        true,  // enabling the query
        { 
          queryKey: ["2nd banner"],
          staleTime: 5 * 60 * 1000, 
          refetchOnWindowFocus: false,
          retry: 1,
        }
      );
      // console.log('katakatka:',data);
      if(isFetching) return <p>Loading...</p>;  
  return (

    (<div className="content-container pt-6 flex ">
     {data?.map((i,index)=>{
      return (
        <div
        className="mx-auto"
        style={{
          width: '100%', // Adjust this to make the banner smaller (e.g., 60%, 70%)
           // Optional: Set a max limit to avoid it getting too large
          aspectRatio: '2560 / 300',
        }}
        key={index}
      >
        <img
          src={i?.img}
          alt="Second Banner"
          className="justify-between"
        />
      </div>
      )
     })}
     
    </div>)
  );
}

export default SecondBanner;

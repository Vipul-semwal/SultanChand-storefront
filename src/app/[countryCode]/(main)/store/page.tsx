import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our books.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string,
    q?: string,
    category:string,
    handle:string,
    searchby?: string

  }>
  params: Promise<{
    countryCode: string,
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page,q,category,handle,searchby } = searchParams
  // console.log('serchby',searchby )
 
  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      serchQuery={q}
      category={category}
      handle={handle}
      searchby={searchby}
      
    />
  )
}

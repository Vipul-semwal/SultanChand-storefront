import React from 'react'
import AuthorInfo from '@modules/authors/templates/AuthorInfo';
import { getRegion } from '@lib/data/regions';


async function page(props: {
    params: Promise<{ id: string }>,
    searchParams:Promise<{ countryCode: string }>
  }) {
    const params = await props.params
    // const serchparams = (await props.searchParams).countryCode
    // console.log('hanhan',props)
    const {id} = params
    const region = (await getRegion('in')) ?? undefined;
   
  return (
    <AuthorInfo id={id} region={region}/>
  )
}

export default page
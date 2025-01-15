import React from 'react'
import AuthorInfo from '@modules/authors/templates/AuthorInfo'


async function page(props: {
    params: Promise<{ id: string }>
  }) {
    const params = await props.params
    const {id} = params
  return (
    <AuthorInfo id={id} />
  )
}

export default page
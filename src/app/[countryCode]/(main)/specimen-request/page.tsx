import React from 'react'
import SpecimenRequestForm from '@modules/specimen-request/components/specimen-request-form'
import GlobalHero from '@modules/common/components/globalhero'

function page() {
  return (
    <>
    <GlobalHero backgroundImage='/banner.jpg' title='Specimen Request' subtitle='Specimen Request you can Apply'/>
     <div className="container bg-orange-50 p-4">

     <SpecimenRequestForm/>
  </div>
    </>
 
  )
}

export default page
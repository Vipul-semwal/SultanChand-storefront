import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import NewsAnnouncements from "@modules/home/components/NewsAndAnnouncement/index"
import InfoBanner from "@modules/home/components/infoBanner"
import Author from "@modules/home/components/author"
import Blog from "@modules/home/components/Blog"
import Testimonial from "@modules/home/components/reviews"
import SecondBanner from "@modules/home/components/2ndBanner/secondBanner"

export const metadata: Metadata = {
  title: "sultan chand & Sons",
  description:
    "A performant frontend ecommerce ",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  });

  console.log("collections", collections) 

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <NewsAnnouncements />
      <SecondBanner/>
      <div className="py-6">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <InfoBanner/>
      <Author/>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
  <div className="md:col-span-8">
    <Blog />
  </div>
  <div className="md:col-span-4">
    <Testimonial />
  </div>
</div>

      
    </>
  )
}

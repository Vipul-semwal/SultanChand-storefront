"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import InteractiveLink from "@modules/common/components/interactive-link"

export default function GoBackToLastCategory() {
  const [handle, setHandle] = useState<string | null>(null)
  const [shouldShow, setShouldShow] = useState(false)
  const [noHistory, setNoHistory] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const searchby = searchParams.get("searchby")

    if (searchby === "author") {
      const last = localStorage.getItem("lastVisitedCategory")
      if (last) {
        setHandle(last)
        setShouldShow(true)
      } else {
        setNoHistory(true) // show fallback
      }
    }
  }, [searchParams])

  if (!searchParams.get("searchby") || searchParams.get("searchby") !== "author") return null

  const linkHref = handle
    ? `/categories/${handle}?handle=${handle}`
    : `/store`

  const linkText = handle
    ? "Return to your last visited category"
    : "Browse all available books"

  return (
    <div className="my-6">
      <InteractiveLink href={linkHref}>
        <span className="mr-2 text-lg">↩</span>
        <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-sm text-gray-800 rounded-full shadow-sm hover:bg-gray-200 transition-all duration-200">
          {linkText}
        </span>
      </InteractiveLink>
    </div>
  )
}

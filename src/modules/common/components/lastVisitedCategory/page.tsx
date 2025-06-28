"use client"
import { useEffect } from "react"

export default function SetLastVisitedCategory() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const handle = searchParams.get("handle") || searchParams.get("category")

    console.log("Setting last visited category:", handle)

    if (handle) {
      localStorage.setItem("lastVisitedCategory", handle)
    }
  }, [])

  return null
}

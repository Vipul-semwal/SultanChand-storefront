import { sdk } from "@lib/config"
import { useQueryData } from "./useQueryData"

type AuthorsResponse = {
    author: {
      id: string
      name: string
      description: string
      image: string
      subText: string
    }[]
    count: number
    limit: number
    offset: number
  }
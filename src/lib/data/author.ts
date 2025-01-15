import { HttpTypes } from "@medusajs/types"

function getAllAuthors({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams 
  countryCode?: string
  regionId?: string
}) {
    const limit = queryParams?.limit || 12
    const _pageParam = Math.max(pageParam, 1)
    const offset = (_pageParam - 1) * limit
}


// function getAuthorById(id: string) {
//   return authors.find((author) => author.id === id);
// }

// function getAuthorBooks(authorId: string) {
//   return books.filter((book) => book.authorId === authorId);
// }

export { getAllAuthors };
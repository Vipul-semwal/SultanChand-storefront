// src/lib/utils/categoryStorage.ts

const CATEGORY_KEY = "lastVisitedCategory"

export function setLastVisitedCategory(handle: string) {
  // remove if exists
  localStorage.removeItem(CATEGORY_KEY)
  // set new
  localStorage.setItem(CATEGORY_KEY, handle)
}

export function getLastVisitedCategory(): string | null {
  return localStorage.getItem(CATEGORY_KEY)
}

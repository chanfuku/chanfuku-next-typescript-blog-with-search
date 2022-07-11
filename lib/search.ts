
import { ParsedUrlQuery } from 'querystring'
import { SearchType } from '../types/search'

export const setItemsToStorage = ({ keyword, selectedCategories }: SearchType) => {
  sessionStorage.setItem('keyword', keyword)
  sessionStorage.setItem('selectedCategories', selectedCategories.join(','))
}

export const getItemsFromStorage = (): SearchType => {
  const keyword = sessionStorage.getItem('keyword') || ''
  const selectedCategories = (sessionStorage.getItem('selectedCategories') || '').split(',').filter(Boolean)
  return { keyword, selectedCategories }
}

export const getSearchParamsFromQuery = (query: ParsedUrlQuery): SearchType => {
    const keyword = query.keyword ? String(query.keyword) : ''
    const selectedCategories = query.categories
      ? decodeURI(String(query.categories)).split(',').filter(Boolean)
      : []
    return { keyword, selectedCategories }
}

export const makeQuerySearchParams = ({ keyword, selectedCategories }: SearchType) => {
  return { keyword, categories: selectedCategories.join(',') }
}


import { ParsedUrlQuery } from 'querystring'
import { SearchType } from '../types/search'

export const setItemsToStorage = ({ keyword, selectedTags }: SearchType) => {
  sessionStorage.setItem('keyword', keyword)
  sessionStorage.setItem('selectedTags', selectedTags.join(','))
}

export const getItemsFromStorage = (): SearchType => {
  const keyword = sessionStorage.getItem('keyword') || ''
  const selectedTags = (sessionStorage.getItem('selectedTags') || '').split(',').filter(Boolean)
  return { keyword, selectedTags }
}

export const getSearchParamsFromQuery = (query: ParsedUrlQuery): SearchType => {
    const keyword = query.keyword ? String(query.keyword) : ''
    const selectedTags = query.tags
      ? decodeURI(String(query.tags)).split(',').filter(Boolean)
      : []
    return { keyword, selectedTags }
}

export const makeQuerySearchParams = ({ keyword, selectedTags }: SearchType) => {
  return { keyword, tags: selectedTags.join(',') }
}


import { ParsedUrlQuery } from 'querystring'
import { SearchType } from '../types/search'
import { Entry } from 'contentful'
import { IBlogPostFields } from '../@types/generated/contentful'

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

export const getSearchResult = ({ keyword, selectedTags }: SearchType, allPosts: Entry<IBlogPostFields>[]): Entry<IBlogPostFields>[] => {
  if (!keyword && !selectedTags.length) {
    return allPosts
  }
  const filtered = allPosts.filter((post: Entry<IBlogPostFields>) => {
    const keywordFound = keyword.length && 
      (post.fields.title.includes(keyword) || post.fields.slug.includes(keyword) || post.fields.body.includes(keyword) || post.fields.description.includes(keyword))
    if (keywordFound) return true
    return selectedTags.some((tag: string) => post.metadata.tags.map(v => v.sys.id).includes(tag))
  })
  return filtered
}

export const getSelectedTags = (selectedTags: string[], value: string): string[] => {
  const tagSet: Set<string> = new Set(selectedTags)
  if (tagSet.has(value)) {
    tagSet.delete(value)
  } else {
    tagSet.add(value)
  }
  return Array.from(tagSet)
}

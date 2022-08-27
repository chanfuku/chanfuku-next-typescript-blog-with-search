import { useQueryClient } from 'react-query'
import { SearchType, GlobalStateKeys } from '../types/search'
import { setQueryData, getQueryData } from '../lib/reactQuery'

export const useQueryData = () => {
  const queryClient = useQueryClient()

  const setSearchKeywordAndTags = ({ keyword, selectedTags }: SearchType): void => {
    setQueryData(queryClient, GlobalStateKeys.keyword, keyword)
    setQueryData(queryClient, GlobalStateKeys.selectedTags, selectedTags)
  }

  const getSearchKeywordAndTags = (): SearchType => {
    const keyword: string = getQueryData(queryClient, GlobalStateKeys.keyword) ?? ''
    const selectedTags: string[] = getQueryData(queryClient, GlobalStateKeys.selectedTags) ?? []
    return { keyword, selectedTags }
  }

  return {
    setSearchKeywordAndTags,
    getSearchKeywordAndTags,
  }
}

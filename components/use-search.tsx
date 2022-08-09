import { useState } from 'react'
import { Entry } from 'contentful'
import { IBlogPostFields } from '../@types/generated/contentful'
import { SearchType } from '../types/search'
import { getSearchResultByKeyword, getSearchResultBySelectedTags, getSelectedTags } from '../lib/search'

export const useSearch = (allPosts: Entry<IBlogPostFields>[]) => {
  const [posts, setPosts] = useState<Entry<IBlogPostFields>[]>(allPosts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const handleSearchResultByKeyword = ((keyword: string, posts: Entry<IBlogPostFields>[]) => {
    return getSearchResultByKeyword({ keyword, posts })
  })
  const handleSearchResult = ({ keyword, selectedTags }: SearchType) => {
    const keywordSearchResult = handleSearchResultByKeyword(keyword, allPosts)
    const finalResult = getSearchResultBySelectedTags({ selectedTags, posts: keywordSearchResult })
    setKeyword(keyword)
    setSelectedTags(selectedTags)
    setPosts(finalResult)
  }
  const handleSelectedTags = (value: string) => {
    const currentSelectedTags = getSelectedTags(selectedTags, value)
    return currentSelectedTags
  }

  return {
    posts,
    keyword,
    selectedTags,
    handleSelectedTags,
    handleSearchResult,
  }
}

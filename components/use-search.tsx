import { useState } from 'react'
import { Entry } from 'contentful'
import { IBlogPostFields } from '../@types/generated/contentful'
import { SearchType } from '../types/search'
import { getSearchResultByKeyword, getSearchResultBySelectedTags, getSelectedTags } from '../lib/search'

export const useSearch = (allPosts: Entry<IBlogPostFields>[]) => {
  const [posts, setPosts] = useState<Entry<IBlogPostFields>[]>(allPosts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const handleSearchResult = ({ keyword, selectedTags }: SearchType) => {
    const keywordSearchResult = getSearchResultByKeyword({ keyword, posts: allPosts })
    const finalResult = getSearchResultBySelectedTags({ selectedTags, posts: keywordSearchResult })
    setKeyword(keyword)
    setSelectedTags(selectedTags)
    setPosts(finalResult)
  }

  return {
    posts,
    keyword,
    selectedTags,
    handleSearchResult,
  }
}

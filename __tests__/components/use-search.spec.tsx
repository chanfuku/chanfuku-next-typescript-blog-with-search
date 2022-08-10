import { renderHook, act } from '@testing-library/react-hooks'
import { useSearch } from '../../components/use-search'
import { post1, allPosts } from '../lib/search.spec'

describe('useSearch', () => {
  test('keyword=test1, tag=tag1が検索ヒットする', () => {
    const { result } = renderHook(() => useSearch(allPosts))
    act(() => {
      result.current.handleSearch({ keyword: 'test1', selectedTags: ['tag1'] })
    })

    expect(result.current.posts).toStrictEqual([post1])
    expect(result.current.keyword).toBe('test1')
    expect(result.current.selectedTags).toStrictEqual(['tag1'])
  })
  test('keyword=test1, tag=tag1,tag2が検索ヒットする', () => {
    const { result } = renderHook(() => useSearch(allPosts))
    act(() => {
      result.current.handleSearch({ keyword: 'test1', selectedTags: ['tag1', 'tag2'] })
    })

    expect(result.current.posts).toStrictEqual([post1])
    expect(result.current.keyword).toBe('test1')
    expect(result.current.selectedTags).toStrictEqual(['tag1', 'tag2'])
  })
  test('keyword=test1, tag=tag2で検索ヒットしない', () => {
    const { result } = renderHook(() => useSearch(allPosts))
    act(() => {
      result.current.handleSearch({ keyword: 'test1', selectedTags: ['tag2'] })
    })

    expect(result.current.posts).toStrictEqual([])
    expect(result.current.keyword).toBe('test1')
    expect(result.current.selectedTags).toStrictEqual(['tag2'])
  })
});

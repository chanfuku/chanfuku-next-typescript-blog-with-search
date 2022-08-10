import { client } from '../../utils/client'
import { getAllPosts, getAllTags } from '../../lib/api'
import { allTags } from '../components/search-box.spec'

export const blogItems = [
  {
    fields: {
      title: 'Test Title1',
      slug: 'test-slug1',
      description: 'test description1',
      body: 'test body1',
      publishDate: '2022-07-19T00:00+09:00',
    }
  },
  {
    fields: {
      title: 'Test Title2',
      slug: 'test-slug2',
      description: 'test description2',
      body: 'test body2',
      publishDate: '2022-07-20T00:00+09:00',
    }
  }
] as const

describe('lib/api.ts', () => {

  beforeEach(() => {
    jest.spyOn(client, 'getEntries').mockResolvedValue({ items: blogItems } as any)
    jest.spyOn(client, 'getTags').mockResolvedValue({ items: allTags } as any)
  })

  test('getAllPostsの戻り値が正しい', async () => {
    const result = await getAllPosts({ content_type: 'blogPost' })
    expect(result).toStrictEqual(blogItems)
  })

  test('getAllTagsの戻り値が正しい', async () => {
    const result = await getAllTags()
    expect(result).toStrictEqual(allTags)
  })
})

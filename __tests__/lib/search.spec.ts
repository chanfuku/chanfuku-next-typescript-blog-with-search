import { getSearchResult, getSelectedTags } from '../../lib/search'
import { Entry } from 'contentful'
import { IBlogPostFields } from '../../@types/generated/contentful'

test('getSearchResult', () => {
  const post1 = {
    fields: {
      body: 'test1',
      description: 'test1',
      title: 'test1',
      slug: 'test1',
    },
    metadata: {
      tags: [
        {
          sys: {
            id: 'tag1'
          }
        }
      ]
    }
  }
  const post2 = {
    fields: {
      body: 'test2',
      description: 'test2',
      title: 'test2',
      slug: 'test2',
    },
    metadata: {
      tags: [
        {
          sys: {
            id: 'tag2'
          }
        }
      ]
    }
  }
  const post3 = {
    fields: {
      body: 'test3',
      description: 'test3',
      title: 'test3',
      slug: 'test3',
    },
    metadata: {
      tags: [
        {
          sys: {
            id: 'tag1'
          }
        },
        {
          sys: {
            id: 'tag2'
          }
        }
      ]
    }
  }

  const allPosts = [post1, post2, post3] as Entry<IBlogPostFields>[]
  let actual = getSearchResult({keyword: 'test1', selectedTags: ['tag1']}, allPosts)
  expect(actual).toStrictEqual([post1, post3])
});

test('getSelectedTags', () => {
  let actual = getSelectedTags(['tag1', 'tag2'], 'tag3')
  expect(actual).toStrictEqual(['tag1', 'tag2', 'tag3'])

  actual = getSelectedTags(['tag1', 'tag2'], 'tag2')
  expect(actual).toStrictEqual(['tag1'])
});

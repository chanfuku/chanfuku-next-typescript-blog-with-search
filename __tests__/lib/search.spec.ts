import { getSearchResultByKeyword, getSearchResultBySelectedTags, getSelectedTags } from '../../lib/search'
import { Entry } from 'contentful'
import { IBlogPostFields } from '../../@types/generated/contentful'

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

describe('getSearchResultByKeyword', () => {
  test('キーワード検索で記事が取得出来るケース', () => {
    const actual = getSearchResultByKeyword({ keyword: 'test1', posts: allPosts })
    expect(actual).toStrictEqual([post1])
  })
  test('キーワード検索で記事が取得出来ないケース', () => {
    const actual = getSearchResultByKeyword({ keyword: 'test1 ', posts: allPosts })
    expect(actual).toStrictEqual([])
  })
});

describe('getSearchResultBySelectedTags', () => {
  test('一つのタグを選択して記事が取得出来るケース', () => {
    const actual = getSearchResultBySelectedTags({ selectedTags: ['tag1'], posts: allPosts })
    expect(actual).toStrictEqual([post1, post3])
  })
  test('複数のタグを選択して記事が取得出来るケース', () => {
    const actual = getSearchResultBySelectedTags({ selectedTags: ['tag1', 'tag2'], posts: allPosts })
    expect(actual).toStrictEqual([post1, post2, post3])
  })
});

describe('getSelectedTags', () => {
  test('tag1, tag2を選択している状態でtag3を追加するケース', () => {
    const actual = getSelectedTags(['tag1', 'tag2'], 'tag3')
    expect(actual).toStrictEqual(['tag1', 'tag2', 'tag3'])
  })
  test('tag1, tag2を選択している状態でtag2を削除するケース', () => {
    const actual = getSelectedTags(['tag1', 'tag2'], 'tag2')
    expect(actual).toStrictEqual(['tag1'])
  })
});

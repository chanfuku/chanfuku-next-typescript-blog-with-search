import React from "react";
import { render, screen } from '@testing-library/react';
import { Tag } from 'contentful'
import SearchBox from '../../components/search-box'

const allTags: Tag[] = [
  {
    name: 'tag1名',
    sys: {
      id: 'tag1',
      type: 'Tag',
      version: 1,
      visibility: 'public'
    }
  },
  {
    name: 'tag2名',
    sys: {
      id: 'tag2',
      type: 'Tag',
      version: 1,
      visibility: 'public'
    }
  },
  {
    name: 'tag3名',
    sys: {
      id: 'tag3',
      type: 'Tag',
      version: 1,
      visibility: 'public'
    }
  }
]

test('検索ワードが入力された状態で表示されること', () => {
  render(
    <SearchBox
      keyword="キーワード"
      selectedTags={[]}
      allTags={allTags}
      addOrRemove={jest.fn()}
      onKeywordChange={jest.fn()}
    />
  )

  const textbox = screen.getByRole('textbox')
  expect(textbox).toHaveValue('キーワード')
});

test('いくつかのcheckboxがcheckedの状態で表示されること', () => {
  render(
    <SearchBox
      keyword=""
      selectedTags={["tag1", "tag2"]}
      allTags={allTags}
      addOrRemove={jest.fn()}
      onKeywordChange={jest.fn()}
    />
  )

  const checkbox1 = screen.getByRole('checkbox', { name: 'tag1名' });
  expect(checkbox1).toBeChecked()

  const checkbox2 = screen.getByRole('checkbox', { name: 'tag2名' });
  expect(checkbox2).toBeChecked()

  const checkbox3 = screen.getByRole('checkbox', { name: 'tag3名' });
  expect(checkbox3).not.toBeChecked()
});

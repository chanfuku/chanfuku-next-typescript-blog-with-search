export type SearchType = {
  keyword: string,
  selectedTags: string[],
}

export const GlobalStateKeys = {
  keyword: 'keyword',
  selectedTags: 'selectedTags',
} as const
export type GlobalStateKeyType = typeof GlobalStateKeys[keyof typeof GlobalStateKeys]

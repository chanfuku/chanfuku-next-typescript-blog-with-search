export type SearchType = {
  keyword: string,
  selectedTags: string[],
}

export const GlobalStateKeys = {
  searchQuery: 'searchQuery',
} as const
export type GlobalStateKeyType = typeof GlobalStateKeys[keyof typeof GlobalStateKeys]

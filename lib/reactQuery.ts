import { QueryClient } from 'react-query'
import { GlobalStateKeyType } from '../types/search'

export const setQueryData = (queryClient: QueryClient, key: GlobalStateKeyType, value: any): void => {
  queryClient.setQueryData(key, value)
}

export const getQueryData = (queryClient: QueryClient, key: GlobalStateKeyType): any => {
  return queryClient.getQueryData(key)
}

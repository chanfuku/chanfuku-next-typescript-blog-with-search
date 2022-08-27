import { useQueryClient } from 'react-query'
import { GlobalStateKeyType } from '../types/search'

export function useQueryData<T>(key: GlobalStateKeyType):[() => T | undefined, (value: T) => void] {
  const queryClient = useQueryClient()

  const getStateValue = (): T | undefined => {
    return queryClient.getQueryData(key)
  }
  const setStateValue = (value: T): void => {
    queryClient.setQueryData(key, value)
  }

  return [getStateValue, setStateValue]
}

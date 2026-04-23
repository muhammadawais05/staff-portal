import { Maybe } from '@toptal/picasso/utils'
import { useCallback, useEffect, useState } from 'react'

import localStorageService from '../local-storage'

function useStateWithLocalStorage<TData> (
  key: string
): [Maybe<TData>, (value: TData) => void]

function useStateWithLocalStorage<TData> (
  key: string,
  initialState: TData,
  sync?: boolean
): [TData, (value: TData) => void]

// Function style needed for overloading
// eslint-disable-next-line func-style
function useStateWithLocalStorage<TData>(
  key: string,
  initialState?: TData,
  sync?: boolean
): [Maybe<TData>, (value: TData) => void] {
  const [storedValue, setStoredValue] = useState<Maybe<TData>>(
    () => localStorageService.getItem(key) ?? initialState
  )

  const setValue = (value: TData) => {
    localStorageService.setItem(key, value)
    setStoredValue(value)
  }

  const reloadStorage = useCallback(
    () => setStoredValue(localStorageService.getItem(key) ?? storedValue),
    [key, storedValue, setStoredValue]
  )

  useEffect(() => {
    if (!sync) {
      return
    }

    window.addEventListener('storage', reloadStorage)

    return () => window.removeEventListener('storage', reloadStorage)
  }, [sync, reloadStorage])

  return [storedValue, setValue]
}

export default useStateWithLocalStorage

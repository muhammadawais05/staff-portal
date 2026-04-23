import { useMemo } from 'react'
import { SearchBarCategories, createInputCategory } from '@staff-portal/filters'

export const useGetSearchBarCategories = (): SearchBarCategories => {
  const searchBarCategories: SearchBarCategories = useMemo(
    () => [
      createInputCategory({ name: 'keywords' }),
      createInputCategory({ name: 'names' })
    ],
    []
  )

  return searchBarCategories
}

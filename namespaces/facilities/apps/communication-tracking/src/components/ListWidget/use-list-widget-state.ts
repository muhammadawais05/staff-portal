import { useCallback, useMemo, useRef } from 'react'
import { SearchBarCategories } from '@staff-portal/filters'

import { useFilterUrlValuesDecorator } from './use-filter-url-values-decorator'
import { useUrlState } from './use-url-state'
import { stripFilterValues } from './strip-filter-values'

export interface ListWidgetState {
  page?: string
  setPage: (newPage: number) => void
  filterValues: Record<string, unknown>
  filterValuesLoading?: boolean
  handleFilterChange: (newFilterValues: Record<string, unknown>) => void
}

export const useListWidgetState = (
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  searchBarCategories: SearchBarCategories<any> = []
): ListWidgetState => {
  const searchBarCategoriesRef = useRef(searchBarCategories)
  const [urlValues, setUrlValues] = useUrlState()

  const [page, filterUrlValues] = useMemo(() => {
    const { page: urlPage, ...urlFilterValues } = urlValues

    return [urlPage as string | undefined, urlFilterValues]
  }, [urlValues])

  const { filterValues, filterValuesLoading, bufferNewSearchBarOption } =
    useFilterUrlValuesDecorator(filterUrlValues, searchBarCategoriesRef.current)

  const setPage = useCallback(
    (newPage: number) => setUrlValues({ ...filterUrlValues, page: newPage }),
    [setUrlValues, filterUrlValues]
  )

  const handleFilterChange = useCallback(
    (newFilterValues: Record<string, unknown>) => {
      bufferNewSearchBarOption(newFilterValues)

      const newFilterUrlValues = stripFilterValues(
        newFilterValues,
        searchBarCategoriesRef.current
      )

      setUrlValues({ ...newFilterUrlValues, page: 1 })
    },
    [bufferNewSearchBarOption, setUrlValues]
  )

  return {
    page,
    setPage,
    filterValues,
    filterValuesLoading,
    handleFilterChange
  }
}

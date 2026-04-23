import React, { createContext, useContext, useMemo, ReactNode } from 'react'

import { createFilterService } from './utils/create-filter-service'
import { FiltersConfig } from './types'

type FiltersContextProps = ReturnType<typeof createFilterService>

const FiltersContext = createContext<FiltersContextProps>(
  undefined as unknown as FiltersContextProps
)

export const useFiltersContext = () => {
  const context = useContext(FiltersContext)

  if (context === undefined) {
    throw new Error(
      '`useFiltersContext` must be used within a FiltersContextProvider'
    )
  }

  return context
}

export interface FiltersContextProviderProps<
  TFilterValues extends Record<string, unknown>
> {
  filterValues: TFilterValues
  setFilterValues: (newFilterValues: TFilterValues) => void
  config: FiltersConfig
  children?: ReactNode
}

export const FiltersContextProvider = <
  TFilterValues extends Record<string, unknown> = Record<string, unknown>
>({
  children,
  filterValues,
  setFilterValues,
  config
}: FiltersContextProviderProps<TFilterValues>) => {
  const filterService = useMemo(
    () =>
      createFilterService<TFilterValues>({
        filterValues,
        setFilterValues,
        config
      }),
    [filterValues, setFilterValues, config]
  )

  return (
    <FiltersContext.Provider value={filterService}>
      {children}
    </FiltersContext.Provider>
  )
}

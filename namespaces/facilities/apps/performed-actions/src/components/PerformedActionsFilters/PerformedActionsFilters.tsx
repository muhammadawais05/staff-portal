import React from 'react'
import {
  FiltersConfig,
  FiltersContent,
  FiltersContextProvider
} from '@staff-portal/filters'

type Props<TFilterValues extends Record<string, unknown>> = {
  filtersConfig: FiltersConfig
  filterValues: TFilterValues
  handleFilterChange: (newFilterValues: TFilterValues) => void
}

const PerformedActionsFilters = <
  TFilterValues extends Record<string, unknown>
>({
  filtersConfig,
  filterValues,
  handleFilterChange
}: Props<TFilterValues>) => {
  return (
    <FiltersContextProvider<TFilterValues>
      filterValues={filterValues}
      setFilterValues={handleFilterChange}
      config={filtersConfig}
    >
      <FiltersContent hasFiltersExpanded config={filtersConfig} />
    </FiltersContextProvider>
  )
}

export default PerformedActionsFilters

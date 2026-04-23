import React, { useCallback } from 'react'
import { Filters, PaginationParams, SearchBar } from '@staff-portal/filters'
import { useNotifications } from '@toptal/picasso/utils'

import { SORT_OPTIONS, SEARCH_BAR_CATEGORIES } from './config'
import { useFiltersConfig } from '../../hooks'

interface Props {
  filterValues: Record<string, unknown> | undefined
  handleFilterChange: (values: PaginationParams) => void
}

const ClientsFilters = ({ filterValues, handleFilterChange }: Props) => {
  const { showError } = useNotifications()
  const filtersConfig = useFiltersConfig()
  const onError = useCallback(
    () => showError('Unable to fetch items.'),
    [showError]
  )

  return (
    <Filters
      values={filterValues}
      onChange={handleFilterChange}
      config={filtersConfig}
      sortOptions={SORT_OPTIONS}
    >
      {nestableControls => (
        <SearchBar
          name='badges'
          categories={SEARCH_BAR_CATEGORIES}
          nestableControls={nestableControls}
          onError={onError}
        />
      )}
    </Filters>
  )
}

export default ClientsFilters

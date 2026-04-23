import React, { useCallback } from 'react'
import { Tag } from '@toptal/picasso'

import {
  AutocompleteFilterConfig,
  CommonFilterConfig,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: CommonFilterConfig & AutocompleteFilterConfig
}

export const AutocompleteLabelContent = ({
  filterConfig: { label, name, useGetFilterLabel }
}: Props) => {
  const { clearFilterValue, getFilterValue } = useFiltersContext()
  const handleDelete = useCallback(
    () => clearFilterValue(name),
    [clearFilterValue, name]
  )

  const filterValue = getFilterValue<string | undefined>(name)
  const { label: value, loading } = useGetFilterLabel(filterValue)

  if (!filterValue || loading) {
    return null
  }

  return (
    <Tag onDelete={handleDelete}>
      {label}: {value}
    </Tag>
  )
}

export default AutocompleteLabelContent

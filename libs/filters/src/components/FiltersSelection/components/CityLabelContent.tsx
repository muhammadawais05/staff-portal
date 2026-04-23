import React, { useCallback, useMemo } from 'react'
import { Tag } from '@toptal/picasso'

import {
  CommonFilterConfig,
  useFiltersContext,
  CityFilterConfig
} from '../../Filters'
import { GoogleCoordsParams } from '../../FiltersCity'

export interface Props {
  filterConfig: CityFilterConfig & CommonFilterConfig
}

const CityLabelContent = ({ filterConfig: { name, label } }: Props) => {
  const { getFilterValue, clearFilterValue } = useFiltersContext()
  const displayValue = useMemo(() => {
    const filterValue = getFilterValue<GoogleCoordsParams | undefined>(name)

    return filterValue?.display_name
  }, [name, getFilterValue])

  const handleDelete = useCallback(
    () => clearFilterValue(name),
    [name, clearFilterValue]
  )

  if (!displayValue) {
    return null
  }

  return <Tag onDelete={handleDelete}>{`${label}: ${displayValue}`}</Tag>
}

export default CityLabelContent

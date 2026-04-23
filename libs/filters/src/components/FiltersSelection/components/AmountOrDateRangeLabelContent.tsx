import React, { useCallback } from 'react'
import { Tag } from '@toptal/picasso'

import {
  AmountRangeFilterConfig,
  CommonFilterConfig,
  DateRangeFilterConfig,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: (AmountRangeFilterConfig | DateRangeFilterConfig) &
    CommonFilterConfig
}

const AmountOrDateRangeLabelContent = ({
  filterConfig: { name, label }
}: Props) => {
  const {
    getRangeFilterValues,
    clearRangeFilterFromValue,
    clearRangeFilterTillValue
  } = useFiltersContext()
  const { from, till } = getRangeFilterValues<string>(name)

  const clearFrom = useCallback(
    () => clearRangeFilterFromValue(name),
    [name, clearRangeFilterFromValue]
  )

  const clearTill = useCallback(
    () => clearRangeFilterTillValue(name),
    [name, clearRangeFilterTillValue]
  )

  if (!from && !till) {
    return null
  }

  return (
    <>
      {from && <Tag onDelete={clearFrom}>{`${label} (From): ${from}`}</Tag>}
      {till && <Tag onDelete={clearTill}>{`${label} (To): ${till}`}</Tag>}
    </>
  )
}

export default AmountOrDateRangeLabelContent

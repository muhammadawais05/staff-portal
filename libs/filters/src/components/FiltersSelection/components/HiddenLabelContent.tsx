import React, { useCallback, useMemo } from 'react'
import { Tag } from '@toptal/picasso'

import {
  CommonFilterConfig,
  HiddenFilterConfig,
  HiddenFilterValueObject,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: HiddenFilterConfig & CommonFilterConfig
}

const HiddenLabelContent = ({ filterConfig: { name, label } }: Props) => {
  const { getFilterValue, clearFilterValue } = useFiltersContext()
  const displayValue = useMemo(() => {
    const filterValue = getFilterValue<
      HiddenFilterValueObject | string | undefined
    >(name)

    return typeof filterValue === 'object'
      ? filterValue?.displayValue
      : filterValue
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

export default HiddenLabelContent

import React, { useCallback, useMemo } from 'react'
import { Tag } from '@toptal/picasso'

import {
  CommonFilterConfig,
  PresetFilterConfig,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: PresetFilterConfig & CommonFilterConfig
}

const PresetLabelContent = ({
  filterConfig: { name, label, options }
}: Props) => {
  const { getFilterValue, clearFilterValues } = useFiltersContext()

  const displayValue = useMemo(() => {
    const filterValue = getFilterValue<string | undefined>(name)

    return options.find(({ key }) => key === filterValue)?.label
  }, [options, name, getFilterValue])

  const handleDelete = useCallback(
    () => clearFilterValues(),
    [clearFilterValues]
  )

  if (!displayValue) {
    return null
  }

  return <Tag onDelete={handleDelete}>{`${label}: ${displayValue}`}</Tag>
}

export default PresetLabelContent

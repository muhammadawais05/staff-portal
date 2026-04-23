import React, { useCallback, useMemo } from 'react'
import { Tag } from '@toptal/picasso'

import {
  CommonFilterConfig,
  RadioFilterConfig,
  SelectFilterConfig,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: (RadioFilterConfig | SelectFilterConfig) & CommonFilterConfig
}

const SelectOrRadioLabelContent = ({
  filterConfig: { name, subCategoryName, label, options }
}: Props) => {
  const { getFilterValue, clearFilterValue } = useFiltersContext()
  const displayValue = useMemo(() => {
    const filterValue = subCategoryName
      ? (getFilterValue(name) as Record<string, string>)?.[subCategoryName]
      : (getFilterValue(name) as string | undefined) || ''
    const selectedOption = options.find(({ value }) => value === filterValue)

    if (!selectedOption?.value) {
      return
    }

    return selectedOption.label
  }, [options, name, subCategoryName, getFilterValue])

  const handleDelete = useCallback(
    () => clearFilterValue(name),
    [name, clearFilterValue]
  )

  if (!displayValue) {
    return null
  }

  return (
    <Tag titleCase={false} onDelete={handleDelete}>
      {`${label}: ${displayValue}`}
    </Tag>
  )
}

export default SelectOrRadioLabelContent

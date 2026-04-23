import React, { useCallback } from 'react'
import { Tag } from '@toptal/picasso'
import { capitalize } from '@toptal/picasso/utils'

import {
  CommonFilterConfig,
  SliderRangeFilterConfig,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: SliderRangeFilterConfig & CommonFilterConfig
}

const SliderRangeLabelContent = ({
  filterConfig: {
    name,
    label,
    options: { fromPropertyName, tillPropertyName, displayRender }
  }
}: Props) => {
  const {
    getRangeFilterValues,
    clearRangeFilterFromValue,
    clearRangeFilterTillValue
  } = useFiltersContext()
  const { from, till } = getRangeFilterValues<number>(
    name,
    fromPropertyName,
    tillPropertyName
  )

  const clearFrom = useCallback(
    () => clearRangeFilterFromValue(name, fromPropertyName),
    [name, fromPropertyName, clearRangeFilterFromValue]
  )

  const clearTill = useCallback(
    () => clearRangeFilterTillValue(name, tillPropertyName),
    [name, tillPropertyName, clearRangeFilterTillValue]
  )

  const renderRangeValue = useCallback(
    (value: number) => (displayRender ? displayRender(value) : value),
    [displayRender]
  )

  if (!from && !till) {
    return null
  }

  return (
    <>
      {from !== undefined && (
        <Tag onDelete={clearFrom}>
          {`${label} (${capitalize(
            fromPropertyName || 'from'
          )}): ${renderRangeValue(from)}`}
        </Tag>
      )}

      {till !== undefined && (
        <Tag onDelete={clearTill}>
          {`${label} (${capitalize(
            tillPropertyName || 'to'
          )}): ${renderRangeValue(till)}`}
        </Tag>
      )}
    </>
  )
}

export default SliderRangeLabelContent

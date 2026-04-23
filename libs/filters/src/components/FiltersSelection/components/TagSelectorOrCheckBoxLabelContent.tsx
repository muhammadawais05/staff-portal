import React, { useMemo } from 'react'
import { Tag } from '@toptal/picasso'

import {
  CheckboxFilterConfig,
  CommonFilterConfig,
  TagSelectorFilterConfig,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: (CheckboxFilterConfig | TagSelectorFilterConfig) &
    CommonFilterConfig
}

const TagSelectorOrCheckBoxLabelContent = ({
  filterConfig: { name, label, options }
}: Props) => {
  const { hasSelectedGroupFilterOption, clearGroupFilterOptionValue } =
    useFiltersContext()

  const values = useMemo(
    () =>
      options
        ?.map(option => ({
          optionLabel: option.label || ('text' in option && option.text) || '',
          optionValue: option.value || ''
        }))
        .filter(({ optionValue }) =>
          hasSelectedGroupFilterOption(name, optionValue)
        )
        .map(({ optionLabel, optionValue }) => (
          <Tag
            key={`${name}-${optionValue}`}
            onDelete={() => clearGroupFilterOptionValue(name, optionValue)}
          >
            {`${label}: ${optionLabel}`}
          </Tag>
        )),
    [
      options,
      name,
      label,
      hasSelectedGroupFilterOption,
      clearGroupFilterOptionValue
    ]
  )

  if (!values?.length) {
    return null
  }

  return <>{values}</>
}

export default TagSelectorOrCheckBoxLabelContent

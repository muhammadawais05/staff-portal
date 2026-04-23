import { Tag } from '@toptal/picasso'
import React, { useMemo } from 'react'

import {
  TypeSelectorFilterConfig,
  CommonFilterConfig,
  useFiltersContext
} from '../../Filters'

export interface Props {
  filterConfig: TypeSelectorFilterConfig & CommonFilterConfig
}

const TypeSelectorLabelContent = ({
  filterConfig: { name, label, options, subCategoryName }
}: Props) => {
  const { hasSelectedGroupFilterOption, clearGroupFilterOptionValue } =
    useFiltersContext()

  const values = useMemo(() => {
    const renderTag = (
      filterName: string,
      optionLabel: string,
      optionValue: string
    ) => (
      <Tag
        key={`${filterName}-${optionValue}`}
        onDelete={() => clearGroupFilterOptionValue(filterName, optionValue)}
      >
        {`${label}: ${optionLabel}`}
      </Tag>
    )

    const selectedItems = options
      .filter(({ id, children }) => {
        const hasSelectedChild = children?.some(
          (_, index) =>
            subCategoryName &&
            hasSelectedGroupFilterOption(subCategoryName, children[index].id)
        )

        return !hasSelectedChild && hasSelectedGroupFilterOption(name, id)
      })
      .map(({ label: optionLabel, id }) => renderTag(name, optionLabel, id))

    if (!subCategoryName) {
      return selectedItems
    }

    const selectedSubCategories = options.map((option, categoryIndex) =>
      option.children
        ?.filter(() => {
          const hasSelectedChild = option.children?.some(
            (_, index) =>
              subCategoryName &&
              option?.children &&
              hasSelectedGroupFilterOption(
                subCategoryName,
                option?.children[index]?.id
              )
          )

          return (
            hasSelectedChild ||
            !hasSelectedGroupFilterOption(name, options[categoryIndex].id)
          )
        })
        ?.filter(({ id }) => hasSelectedGroupFilterOption(subCategoryName, id))
        .map(({ label: optionLabel, id: optionValue }) =>
          renderTag(
            subCategoryName,
            `${optionLabel} ${option.label}`,
            optionValue
          )
        )
    )

    return [...selectedItems, ...selectedSubCategories]
  }, [
    options,
    subCategoryName,
    name,
    label,
    hasSelectedGroupFilterOption,
    clearGroupFilterOptionValue
  ])

  if (!values?.length) {
    return null
  }

  return <>{values}</>
}

export default TypeSelectorLabelContent

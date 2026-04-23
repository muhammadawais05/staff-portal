import React from 'react'

import { Sort, SortOption, SortOrder } from '../../types'
import { useFiltersContext } from '../Filters/FiltersContext'
import SortButton from '../SortButton'

const SORT_KEY = 'sort'

export interface Props {
  options: SortOption[]
  filtersSize: 'small' | 'medium'
}

const getDefaultSort = (options: SortOption[]): Sort | {} => {
  const defaultOption = options.find(option => option.defaultSort)

  if (!defaultOption?.defaultSort) {
    return {}
  }

  return {
    target: defaultOption.value,
    order: defaultOption.defaultSort
  }
}

const composeSortValue = (
  currentValue: Sort,
  isTargetValid: boolean,
  defaultValue?: Sort
): Sort => {
  const isOrderValid = Object.values(SortOrder).includes(currentValue.order)

  const order = isOrderValid
    ? currentValue.order
    : defaultValue?.order || SortOrder.ASC

  const target = isTargetValid
    ? currentValue.target
    : defaultValue?.target || ''

  return {
    order,
    target
  }
}

const getCurrentSort = (options: SortOption[], currentValue?: Sort): Sort => {
  const defaultValue = getDefaultSort(options) as Sort

  if (!currentValue) {
    return defaultValue
  }

  const isTargetValid = options.some(
    ({ value }) => value === currentValue.target
  )

  if (!isTargetValid && !defaultValue) {
    return {} as Sort
  }

  return composeSortValue(currentValue, isTargetValid, defaultValue)
}

const filterHiddenOptions = (options: SortOption[]) =>
  options.filter(option => !option.hidden)

const FiltersSort = ({ options = [], filtersSize }: Props) => {
  const { getFilterValue, setFilterValue } = useFiltersContext()

  const parsedOptions = filterHiddenOptions(options)

  const currentSort = getCurrentSort(
    parsedOptions,
    getFilterValue<Sort>(SORT_KEY)
  )

  const handleSort = (value: string, order?: SortOrder) => {
    const defaultSort =
      options.find(({ value: optionValue }) => optionValue === value)
        ?.defaultSort ?? SortOrder.ASC

    const defaultNextOrderValue =
      value === currentSort.target ? currentSort.order : defaultSort

    const newSort: Sort = {
      target: value,
      order: order || defaultNextOrderValue
    }

    setFilterValue(SORT_KEY, newSort)
  }

  const handleOrder = () => {
    const nextOrder =
      currentSort.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC

    handleSort(currentSort.target, nextOrder)
  }

  const sortOptions = parsedOptions.map(
    ({ text, value, disabled, tooltipContent }) => {
      const selected = currentSort.target === value

      return {
        text,
        value,
        order: selected ? currentSort.order : undefined,
        disabled,
        tooltipContent
      }
    }
  )

  return (
    <SortButton
      sortElements={sortOptions}
      onSort={handleSort}
      onOrder={handleOrder}
      selectedValue={currentSort.target}
      size={filtersSize}
    />
  )
}

export default FiltersSort

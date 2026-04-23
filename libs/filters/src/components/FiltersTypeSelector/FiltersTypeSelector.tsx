import React, { useState } from 'react'
import { Props as FormTagSelectorProps } from '@toptal/picasso-forms/TagSelector/TagSelector'

import FiltersField from '../Filters/FiltersField'
import { useFiltersContext } from '../Filters/FiltersContext'
import { TypeSelect, TypeSelectOption } from '../TypeSelect'
import { CommonFilterConfig } from '../Filters'

export type FiltersTypeSelectorProps = Pick<
  FormTagSelectorProps,
  'loading' | 'placeholder'
> &
  Pick<
    CommonFilterConfig,
    'name' | 'label' | 'labelWidth' | 'subCategoryName'
  > & {
    options: TypeSelectOption[]
    searchPlaceholder?: string
  }

const getInitialOptionsFromFilterValue = (
  options: TypeSelectOption[],
  filterValues?: string[],
  filterSubCategoryValues?: string[]
) => {
  const values: TypeSelectOption[] = []

  if (!options) {
    return values
  }

  if (filterValues) {
    values.push(
      ...options.filter(
        option =>
          filterValues.includes(option.id) &&
          !option?.children?.some(({ id }) =>
            filterSubCategoryValues?.includes(id)
          )
      )
    )
  }

  if (filterSubCategoryValues) {
    values.push(
      ...options
        .map(({ children }) => {
          const selectedChildren = children?.filter(child =>
            filterSubCategoryValues.includes(child.id)
          )

          return selectedChildren || []
        })
        .flat()
    )
  }

  return values
}

const FiltersTypeSelector = ({
  label,
  labelWidth,
  name,
  subCategoryName,
  loading,
  placeholder,
  options,
  searchPlaceholder
}: FiltersTypeSelectorProps) => {
  const { getFilterValue, setFilterValues } = useFiltersContext()

  const filterValues = getFilterValue<string[] | undefined>(name)

  const filterSubCategoryValues = subCategoryName
    ? getFilterValue<string[] | undefined>(subCategoryName)
    : undefined

  const [value, setValue] = useState<TypeSelectOption[] | undefined>(
    getInitialOptionsFromFilterValue(
      options,
      filterValues,
      filterSubCategoryValues
    )
  )

  const handleChange = (values: TypeSelectOption[] = []) => {
    let newFilterValues: Record<string, string[]> | undefined = {
      [name]: []
    }

    if (subCategoryName) {
      newFilterValues = values.reduce(
        (acc, item) => {
          const key = options.some(({ id }) => id === item.id)
            ? name
            : subCategoryName

          acc[key] = acc[key] ? [...acc[key], item.id] : [item.id]

          return acc
        },
        {
          ...newFilterValues,
          [subCategoryName]: []
        }
      )
    } else {
      newFilterValues[name] = values.map(item => item.id)
    }

    setValue(values)
    setFilterValues(newFilterValues)
  }

  return (
    <FiltersField
      key={name}
      label={label}
      labelWidth={labelWidth}
      htmlFor={name}
    >
      <TypeSelect
        data-testid='filters-tree-selector'
        placeholder={placeholder}
        loading={loading}
        options={options}
        value={value}
        onChange={handleChange}
        searchPlaceholder={searchPlaceholder}
      />
    </FiltersField>
  )
}

export default FiltersTypeSelector

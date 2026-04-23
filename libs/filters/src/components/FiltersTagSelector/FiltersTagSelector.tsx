import React, { useState } from 'react'
import { TagSelector, AutocompleteItem } from '@toptal/picasso'
import { Props as FormTagSelectorProps } from '@toptal/picasso-forms/TagSelector/TagSelector'
import { Item } from '@toptal/picasso/TagSelector'
import { isSubstring, toTitleCase } from '@toptal/picasso/utils'

import FiltersField from '../Filters/FiltersField'
import { useFiltersContext } from '../Filters/FiltersContext'
import { CommonFilterConfig } from '../Filters'

export type FiltersTagSelectorProps = Pick<
  FormTagSelectorProps,
  'loading' | 'options' | 'placeholder'
> &
  Pick<CommonFilterConfig, 'name' | 'label' | 'labelWidth'>

const getDisplayValue = (item: AutocompleteItem | null) =>
  toTitleCase(item?.text ?? '') as string

const FiltersTagSelector = ({
  name,
  label,
  labelWidth,
  loading,
  placeholder,
  options: allOptions
}: FiltersTagSelectorProps) => {
  const { getFilterValue, setFilterValues } = useFiltersContext()
  const [options, setOptions] = useState<AutocompleteItem[] | null | undefined>(
    allOptions
  )
  const filterValue = getFilterValue<string[] | undefined>(name)
  const getInitialOptionsFromFilterValue = () =>
    filterValue &&
    options?.filter(option => filterValue.includes(option.value as string))

  const [value, setValue] = useState<AutocompleteItem[] | undefined>(
    getInitialOptionsFromFilterValue
  )
  const [inputValue, setInputValue] = useState('')

  const filterOptions = (selectedOption: string) =>
    selectedOption !== ''
      ? allOptions?.filter(option =>
          isSubstring(selectedOption, getDisplayValue(option))
        )
      : allOptions

  const handleChange = (values: Item[]) => {
    setValue(values)

    const selectedValues = values.map(selectedValue => selectedValue.value)

    setFilterValues({
      [name]: selectedValues
    })
  }

  return (
    <FiltersField
      key={name}
      label={label}
      labelWidth={labelWidth}
      htmlFor={name}
    >
      <TagSelector
        data-testid='filters-tag-selector'
        loading={loading}
        placeholder={placeholder}
        width='full'
        options={options}
        value={value}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={newInputValue => {
          setInputValue(newInputValue)
          setOptions(filterOptions(newInputValue))
        }}
        getDisplayValue={getDisplayValue}
      />
    </FiltersField>
  )
}

export default FiltersTagSelector

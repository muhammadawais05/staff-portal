import React, { useState } from 'react'
import { isSubstring } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/Autocomplete'

interface Props {
  options: {
    text: string
    value: string
  }[]
  name: string
  label?: string
  required?: boolean
  loading?: boolean
}

const filterOptions = (
  searchTerm = '',
  options: Item[] = []
): Item[] | null => {
  if (!searchTerm) {
    return options
  }
  const result = options.filter(option =>
    option?.text ? isSubstring(searchTerm, option.text) : false
  )

  return result.length > 0 ? result : null
}

export const TagSelectorField = ({
  options,
  name,
  label,
  required = false,
  loading = false
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const filteredOptions = filterOptions(inputValue, options)

  return (
    <Form.TagSelector
      id={name}
      name={name}
      label={label}
      width='full'
      options={filteredOptions}
      placeholder='Start typing...'
      inputValue={inputValue}
      onInputChange={setInputValue}
      required={required}
      loading={loading}
    />
  )
}

export default TagSelectorField

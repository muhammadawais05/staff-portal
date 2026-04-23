import React, { useCallback, useState } from 'react'
import { Form, useField, useForm } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import { TagSelector } from '@toptal/picasso'

export type Props = {
  name: string
  label: string
  placeholder?: string
}

const TagInput = ({ name, label, placeholder }: Props) => {
  const form = useForm()
  const {
    input: { value }
  } = useField<Item>(name)
  const [inputValue, setInputValue] = useState('')

  const renderLabel = useCallback(
    ({ displayValue, disabled, onDelete }) => (
      <TagSelector.Label
        disabled={disabled}
        titleCase={false}
        onDelete={onDelete}
      >
        {displayValue}
      </TagSelector.Label>
    ),
    []
  )

  const handleInputChange = useCallback(
    (term = '') => {
      setInputValue(term)
    },
    [setInputValue]
  )

  const onOtherOptionSelect = useCallback(
    (newValue: string) => {
      const sanitizedNewValue = newValue.trim().toLowerCase()
      const sanitizedNewText = newValue.trim()

      if (!sanitizedNewValue) {
        return
      }

      const prevValues: Item[] = Array.isArray(value) ? value : []
      const isDuplicatedNewValue = prevValues.some(
        item => item.value === sanitizedNewValue
      )

      if (isDuplicatedNewValue) {
        return
      }

      form.change(name, [
        ...(prevValues ?? []),
        { value: sanitizedNewValue, text: sanitizedNewText }
      ])
    },
    [form, name, value]
  )

  return (
    <Form.TagSelector
      name={name}
      options={null}
      inputValue={inputValue}
      autoComplete='none'
      placeholder={placeholder}
      label={label}
      width='full'
      renderLabel={renderLabel}
      onInputChange={handleInputChange}
      onOtherOptionSelect={onOtherOptionSelect}
    />
  )
}

export default TagInput

import React, { FC, memo, useState, ComponentProps } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { AutocompleteItem } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { useExternalIntegratorContext } from '../../_lib/context/externalIntegratorContext'
import { useGetAutocompleteOptions } from '../../utils/graphql'
import {
  QueryAutocompleteEdgeFragment,
  QueryAutocompleteNodeFragment
} from '../../data'

const displayName = 'Autocomplete'
const MIN_LENGTH = 1
const LIMIT = 500

const getKey = (item: AutocompleteItem) =>
  (item as { node: { id: string } }).node.id

const getDisplayValue = (item: AutocompleteItem | null) =>
  (item?.label as string) ?? ''

interface Props
  extends Omit<
    ComponentProps<typeof Form.Autocomplete>,
    'onChange' | 'onSelect'
  > {
  name: string
  model: AutocompleteModels
  onChange: (term?: string) => void
  onSelect: (node?: QueryAutocompleteNodeFragment) => void
}

const FormInputAutocomplete: FC<Props> = memo<Props>(props => {
  const { model, onChange, onSelect, ...rest } = props
  const { modalContainer } = useExternalIntegratorContext()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const {
    getOptions,
    options: allOptions,
    loading
  } = useGetAutocompleteOptions(model)

  const options = searchTerm.length >= MIN_LENGTH ? allOptions : null

  const handleChange = useDebouncedCallback(
    (term: string, { isSelected }: { isSelected?: boolean } = {}) => {
      setSearchTerm(term)

      if (!isSelected && term.length >= MIN_LENGTH) {
        getOptions(term)
      }

      if (term !== searchTerm) {
        onChange(term)
      }
    },
    LIMIT
  )

  const handleSelect = (autocompleteItem: AutocompleteItem) => {
    const item = autocompleteItem as QueryAutocompleteEdgeFragment

    if (!item?.node) {
      return
    }

    setSearchTerm(item.label || '')
    onSelect(item.node)
  }

  return (
    <Form.Autocomplete
      data-testid={displayName}
      {...rest}
      getDisplayValue={getDisplayValue}
      getKey={getKey}
      loading={loading}
      onChange={handleChange}
      onSelect={handleSelect}
      options={options}
      popperContainer={modalContainer}
      value={searchTerm}
    />
  )
})

FormInputAutocomplete.displayName = displayName

export default FormInputAutocomplete

import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/Autocomplete/types'
import { useNotifications } from '@toptal/picasso/utils'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { AutocompleteHighlightOptionWithPhoto } from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import {
  useGetUserSearchAutocomplete,
  UserSearchAutocompleteFragment
} from '../../data/get-user-search-autocomplete'

interface Props {
  name: string
  'data-testid'?: string
  required: boolean
  label?: string
  loading?: boolean
  placeholder?: string
  disabled?: boolean
  onSelect?: (referrerId: string) => void
  onReset?: () => void
}

const ReferrerInput = ({
  name,
  'data-testid': dataTestId = 'referrer-input',
  required,
  label,
  loading,
  placeholder,
  disabled,
  onSelect,
  onReset
}: Props) => {
  const { showError } = useNotifications()

  const {
    getUsers,
    data: users,
    loading: loadingUsers
  } = useGetUserSearchAutocomplete({
    onError: () => showError('An error occurred. Failed to load referrer list.')
  })

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term: string) => {
        getUsers({ term, model: AutocompleteModels.PAYEES })
      },
      searchOptions: users,
      loadingOptions: loadingUsers
    })

  const handleChange = (searchQuery: string) => {
    setSearchTerm(searchQuery)
    search(searchQuery)

    if (!searchQuery) {
      onReset?.()
    }
  }

  const handleSelect = (item: Item) => {
    const { node } = item as UserSearchAutocompleteFragment

    if (!node) {
      return
    }

    onSelect?.(node.id)
  }

  return (
    <Form.Autocomplete
      width='full'
      maxLength={2048}
      label={label}
      name={name}
      testIds={{ input: dataTestId }}
      options={searchOptions}
      loading={searching || loading}
      value={searchTerm}
      required={required}
      onChange={handleChange}
      onSelect={handleSelect}
      placeholder={placeholder}
      renderOption={(item: Item) => {
        const {
          label: itemLabel,
          labelHighlight,
          nodeTypes,
          photo,
          node
        } = item as UserSearchAutocompleteFragment

        return (
          <AutocompleteHighlightOptionWithPhoto
            label={itemLabel}
            labelHighlight={labelHighlight}
            nodeTypes={nodeTypes}
            photo={photo?.thumb}
            status={node && 'status' in node ? node.status : undefined}
          />
        )
      }}
      getDisplayValue={(item: Item | null) =>
        (item as UserSearchAutocompleteFragment)?.label || ''
      }
      getKey={(item: Item) => (item as UserSearchAutocompleteFragment).key}
      disabled={disabled}
    />
  )
}

export default ReferrerInput

import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import {
  Autocomplete,
  AutocompleteHighlightOptionWithPhoto
} from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import {
  useGetAssociationUserAutocomplete,
  AssociationAutocompleteUser
} from './data/get-association-user-autocomplete'

const getLoadedUserById = ({
  userIdentifier,
  users
}: {
  userIdentifier: string
  users: AssociationAutocompleteUser[]
}) => {
  const loadedUser = users.find(user => user.node?.id === userIdentifier)

  if (!loadedUser) {
    throw new Error(
      `Unable to find loaded user by identifier "${userIdentifier}"`
    )
  }

  return loadedUser
}

const autocompleteUserToOptions = ({ node }: AssociationAutocompleteUser) => ({
  value: node?.id,
  text: node?.id
})

interface AutocompleteItem extends Item {
  value: string
  text: string
}

const UserAssociationAutocomplete = ({
  onChange
}: {
  onChange: (selectedUser: AssociationAutocompleteUser | null) => void
}) => {
  const {
    getUsers,
    data: users,
    loading: loadingUsers
  } = useGetAssociationUserAutocomplete()

  const usersOptions = useMemo(
    () => (users ? users.map(autocompleteUserToOptions) : null),
    [users]
  )

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: getUsers,
      searchOptions: usersOptions,
      loadingOptions: loadingUsers
    })

  return (
    <>
      <Form.Label>Select user to associate email with</Form.Label>
      <Autocomplete
        width='full'
        placeholder='Type user name...'
        testIds={{
          input: 'user-autocomplete'
        }}
        loading={searching}
        minLength={1}
        value={searchTerm}
        onChange={(value, { isSelected }) => {
          if (isSelected) {
            return
          }

          onChange(null)
          setSearchTerm(value)
          search(value)
        }}
        onSelect={item => {
          const userIdentifier = (item as AutocompleteItem).text

          if (!users) {
            return
          }

          const newlySelectedUser = getLoadedUserById({
            userIdentifier,
            users
          })

          onChange(newlySelectedUser)

          // After the user is selected, the textbox should have the full user name as its value,
          // otherwise the user identifier will be set as an input value
          setSearchTerm(newlySelectedUser.label || '')
        }}
        options={searchOptions}
        renderOption={item => {
          const userIdentifier = (item as AutocompleteItem).text

          if (!users) {
            return
          }

          const { label, labelHighlight, nodeTypes, photo } = getLoadedUserById(
            {
              userIdentifier,
              users
            }
          )

          return (
            <AutocompleteHighlightOptionWithPhoto
              label={label || ''}
              labelHighlight={labelHighlight}
              nodeTypes={nodeTypes}
              photo={photo?.thumb}
            />
          )
        }}
      />
    </>
  )
}

export default UserAssociationAutocomplete

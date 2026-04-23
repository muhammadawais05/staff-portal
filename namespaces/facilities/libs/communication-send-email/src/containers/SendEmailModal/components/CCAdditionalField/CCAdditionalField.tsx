import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { useTagSelector } from '@staff-portal/ui'

import { useGetUserAutocomplete } from './data/get-user-autocomplete'

const CCAdditionalField = () => {
  const {
    getUsers,
    data: users,
    loading
  } = useGetUserAutocomplete({
    model: AutocompleteModels.ACTIVE_STAFF
  })

  const options = useMemo(
    () =>
      users?.map(node => ({
        text: node?.fullName,
        value: node?.email
      })),
    [users]
  )

  const tagSelectorProps = useTagSelector({
    options,
    loading,
    getOptions: getUsers
  })

  return (
    <Form.TagSelector
      {...tagSelectorProps}
      name='ccAdditional'
      placeholder='Select staff from autocomplete'
      label='CC Other Staff Member'
      noOptionsText='No results'
      width='full'
      allowNull
    />
  )
}

export default CCAdditionalField

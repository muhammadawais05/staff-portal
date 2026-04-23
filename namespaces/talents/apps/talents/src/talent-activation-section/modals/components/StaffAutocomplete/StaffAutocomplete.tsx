import React, { useEffect, useState } from 'react'
import { FieldMetaState, useField } from '@toptal/picasso-forms'
import { useDebouncedCallback } from 'use-debounce'
import { Form } from '@toptal/picasso'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { Autocomplete } from '@staff-portal/ui'

import { useGetStaffAutocomplete } from './data/get-staff-autocomplete.staff.gql'

export interface StaffSelectProps {
  fieldName: string
  activationId: string
  activationStepId: string
  initialFullName: string
  required: boolean
}

type OptionItem = {
  text: string
  value: string
}

const joinStaffTitle = (name: string) => `${name} (Staff)`

const getInputError = (meta: FieldMetaState<string>) =>
  meta.error && meta.touched ? meta.error : null

const StaffAutocomplete = ({
  fieldName,
  activationId,
  activationStepId,
  initialFullName,
  required
}: StaffSelectProps) => {
  const {
    input: { onChange: setValue, ...inputAttributes },
    meta
  } = useField(fieldName, {
    validate: value => (!value ? 'Please choose a staff member' : null)
  })
  const inputError = getInputError(meta)
  const [displayedName, setDisplayedName] = useState<string>(initialFullName)

  const [options, setOptions] = useState<OptionItem[]>([])

  const { fetchUsers, loading } = useGetStaffAutocomplete({
    activationId,
    activationStepId,
    onCompleted: users => {
      setOptions(
        users.map(({ node: { id, fullName } }) => ({
          text: fullName,
          value: id
        }))
      )
    }
  })

  const fetchUsersDebounced = useDebouncedCallback(fetchUsers, DEBOUNCE_LIMIT)

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnSelect = ({ text, value }: OptionItem) => {
    setDisplayedName(text)
    setValue(value)
  }

  const handleOnChange = (
    term: string,
    { isSelected }: { isSelected: boolean }
  ) => {
    setDisplayedName(term)
    fetchUsersDebounced(term)
    if (!isSelected) {
      setValue(null)
    }
  }

  return (
    <Form.Field error={inputError}>
      <Form.Label requiredDecoration='asterisk'>Staff</Form.Label>

      <Autocomplete<OptionItem>
        width='full'
        enableAutofill
        error={Boolean(inputError)}
        required={required}
        loading={loading}
        options={options}
        onChange={handleOnChange}
        onSelect={value => handleOnSelect(value)}
        getDisplayValue={item =>
          item && item.text ? joinStaffTitle(item.text) : ''
        }
        {...inputAttributes}
        value={displayedName}
      />
    </Form.Field>
  )
}

export default StaffAutocomplete

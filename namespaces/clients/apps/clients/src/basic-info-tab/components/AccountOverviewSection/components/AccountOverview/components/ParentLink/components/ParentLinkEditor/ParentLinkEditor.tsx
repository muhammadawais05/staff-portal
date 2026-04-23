import React, { useCallback } from 'react'
import { useForm } from '@toptal/picasso-forms'
import { CompanyAutocomplete } from '@staff-portal/clients'

interface Props {
  name: string
  value: string | undefined
  disabled: boolean
  onChange: () => void
}

export const ParentLinkEditor = ({
  name,
  disabled,
  value,
  onChange
}: Props) => {
  // TODO: use Form.Autocomplete inside CompanyAutocomplete
  const { change } = useForm()

  const onSelect = useCallback(
    ({ id }: { id: string }) => {
      change(name, id)
      onChange()
    },
    [change, name, onChange]
  )

  return (
    <CompanyAutocomplete
      autoFocus
      enableReset={false}
      name={name}
      disabled={disabled}
      initialDisplayValue={value}
      // @ts-expect-error size prop is working but it's not type-supported yet
      size='small'
      onSelect={onSelect}
      placeholder='Select company'
      testIds={{
        input: 'ParentLinkEditor-input',
        menuItem: 'ParentLinkEditor-menuItem'
      }}
      required
    />
  )
}

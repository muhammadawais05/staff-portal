import React, { useCallback } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { EditorProps } from '@staff-portal/editable'
import { StaffUserFragment } from '@staff-portal/staff'

const ClientPartnerEditor = <TMutationInput extends Record<string, unknown>>({
  options = [],
  name,
  onSelect,
  onChange,
  ...props
}: EditorProps<TMutationInput, string, Option[]> & {
  onSelect: (staff: Partial<StaffUserFragment>) => void
}) => {
  const handleSelect = useCallback(
    (value: string) => {
      const option = options.find(staff => staff.value === value)

      onChange()
      onSelect({
        fullName: option?.text.replace(/ *\([^)]*\) */g, ''),
        id: option?.value as string
      })
    },
    [onChange, onSelect, options]
  )

  return (
    <Form.Select
      {...props}
      name={name as string}
      options={options}
      onChange={event => handleSelect(event.target.value as string)}
      size='small'
      width='full'
    />
  )
}

export default ClientPartnerEditor

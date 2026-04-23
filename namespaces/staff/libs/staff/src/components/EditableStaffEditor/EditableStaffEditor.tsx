import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { EditorProps } from '@staff-portal/editable'

import { getStaffSelectOptions } from '../../utils'
import { StaffUserFragment } from '../../data'

const EditableStaffEditor = <TMutationInput extends Record<string, unknown>>({
  options: staffOptions = [],
  value,
  currentValue,
  name,
  isSelectedOptionDisabled,
  ...props
}: EditorProps<TMutationInput, string, Option[]> & {
  isSelectedOptionDisabled?: boolean
  currentValue: Partial<StaffUserFragment> | undefined | null
}) => {
  const selectOptions = useMemo(
    () =>
      getStaffSelectOptions({
        staffOptions,
        currentValue,
        isSelectedOptionDisabled
      }),
    [staffOptions, currentValue, isSelectedOptionDisabled]
  )

  return (
    <Form.Select
      {...props}
      name={name as string}
      options={selectOptions}
      value={value}
      size='small'
      width='full'
    />
  )
}

export default EditableStaffEditor

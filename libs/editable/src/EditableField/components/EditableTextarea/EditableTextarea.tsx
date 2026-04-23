import React from 'react'
import { Form } from '@toptal/picasso-forms'

import EditableWrapper from '../EditableWrapper'

interface Props {
  name: string
  required?: boolean
  disabled?: boolean
  error?: string
  placeholder?: string
  cancelText?: string
  submitText?: string
  onReset?: () => void
}

const EditableTextarea = ({
  name,
  required,
  disabled,
  placeholder,
  error,
  ...rest
}: Props) => {
  return <EditableWrapper {...rest} loading={disabled} disabled={disabled}>
    <Form.Input
      autoFocus={false}
      data-testid='EditableTextarea-input'
      disabled={disabled}
      required={required}
      error={error}
      placeholder={placeholder}
      name={name}
      multiline
      rowsMin={4}
      rowsMax={10}
      width='full'
    />
  </EditableWrapper>
}

export default EditableTextarea

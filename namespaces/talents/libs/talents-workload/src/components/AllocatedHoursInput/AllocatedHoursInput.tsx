import React from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { Loader } from '@toptal/picasso'
import { validators } from '@toptal/picasso-forms/utils'
import {
  allocatedHoursValidator,
  requiredValidator
} from '@staff-portal/talents'

interface Props {
  onCancel: () => void
  loading?: boolean
  placeholder?: string
}

const AllocatedHoursInput = ({
  loading = false,
  placeholder,
  onCancel
}: Props) => {
  const { submit, reset } = useForm()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      reset()
      onCancel()
    }
  }

  const { composeValidators } = validators

  return (
    <Form.NumberInput
      autoFocus
      hideControls
      size='small'
      name='allocatedHours'
      step='any'
      disabled={loading}
      placeholder={placeholder}
      icon={loading && <Loader size='small' />}
      onBlur={submit}
      onKeyDown={handleKeyDown}
      validate={composeValidators([requiredValidator, allocatedHoursValidator])}
    />
  )
}

export default AllocatedHoursInput

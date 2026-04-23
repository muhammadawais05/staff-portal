import { Form } from '@toptal/picasso-forms'
import { validators } from '@toptal/picasso-forms/utils'
import React from 'react'
import {
  allocatedHoursValidator,
  requiredValidator
} from '@staff-portal/talents'

const AllocatedHoursInput = () => {
  const { composeValidators } = validators

  return (
    <Form.NumberInput
      autoFocus
      required
      hideControls
      label='Allocated hours'
      width='full'
      name='allocatedHours'
      validate={composeValidators([requiredValidator, allocatedHoursValidator])}
    />
  )
}

export default AllocatedHoursInput

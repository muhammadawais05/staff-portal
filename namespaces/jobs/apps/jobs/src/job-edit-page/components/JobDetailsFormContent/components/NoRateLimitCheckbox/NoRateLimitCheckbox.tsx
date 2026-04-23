import React, { useCallback } from 'react'
import { Form, useField, useForm } from '@toptal/picasso-forms'

import {
  NO_RATE_LIMIT_FIELD,
  UNCERTAIN_OF_BUDGET_FIELD,
  MAX_HOURLY_RATE_FIELD
} from '../../../../config'
import { JobEditFormValues } from '../../../../types'

const NoRateLimitCheckbox = () => {
  const { change } = useForm<JobEditFormValues>()
  const {
    input: { value: uncertainOfBudget }
  } = useField<JobEditFormValues[typeof UNCERTAIN_OF_BUDGET_FIELD]>(
    UNCERTAIN_OF_BUDGET_FIELD
  )

  const handleOnChange = useCallback(
    () => change(MAX_HOURLY_RATE_FIELD, undefined),
    [change]
  )

  return (
    <Form.Checkbox
      name={NO_RATE_LIMIT_FIELD}
      label='No rate limit'
      onChange={handleOnChange}
      disabled={!!uncertainOfBudget}
    />
  )
}

export default NoRateLimitCheckbox

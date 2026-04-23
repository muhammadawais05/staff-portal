import React, { useCallback } from 'react'
import { Form, useField, useForm } from '@toptal/picasso-forms'

import {
  MAX_HOURLY_RATE_FIELD,
  NO_RATE_LIMIT_FIELD,
  UNCERTAIN_OF_BUDGET_FIELD,
  UNCERTAIN_OF_BUDGET_REASON_FIELD
} from '../../../../config'
import { JobEditFormValues } from '../../../../types'

const JobUncertainOfBudgetFields = () => {
  const { change } = useForm<JobEditFormValues>()

  const {
    input: { value: noRateLimit }
  } =
    useField<JobEditFormValues[typeof NO_RATE_LIMIT_FIELD]>(NO_RATE_LIMIT_FIELD)

  const handleOnChange = useCallback(() => {
    change(UNCERTAIN_OF_BUDGET_REASON_FIELD, undefined)
    change(NO_RATE_LIMIT_FIELD, undefined)
    change(MAX_HOURLY_RATE_FIELD, undefined)
  }, [change])

  return (
    <Form.Checkbox
      name={UNCERTAIN_OF_BUDGET_FIELD}
      label='Uncertain of budget'
      disabled={!!noRateLimit}
      onChange={handleOnChange}
      width='full'
    />
  )
}

export default JobUncertainOfBudgetFields

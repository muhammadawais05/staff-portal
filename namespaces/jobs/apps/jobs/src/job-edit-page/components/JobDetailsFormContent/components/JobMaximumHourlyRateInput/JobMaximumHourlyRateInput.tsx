import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso'
import { GridItemField } from '@staff-portal/ui'

import { JobEditFormValues } from '../../../../types'
import {
  MAX_HOURLY_RATE_FIELD,
  NO_RATE_LIMIT_FIELD,
  UNCERTAIN_OF_BUDGET_FIELD
} from '../../../../config'
import { JobMaximumHourlyRateWrapper } from '../index'

interface Props {
  fieldOptions: React.ReactNode
}

export const JobMaximumHourlyRateInput = ({ fieldOptions }: Props) => {
  const {
    input: { value: uncertainOfBudget }
  } = useField<JobEditFormValues[typeof UNCERTAIN_OF_BUDGET_FIELD]>(
    UNCERTAIN_OF_BUDGET_FIELD,
    {
      subscription: { value: true }
    }
  )

  const {
    input: { value: noRateLimit }
  } = useField<JobEditFormValues[typeof NO_RATE_LIMIT_FIELD]>(
    NO_RATE_LIMIT_FIELD,
    {
      subscription: { value: true }
    }
  )

  const hasNoRateLimit = !!noRateLimit || !!uncertainOfBudget

  return (
    <GridItemField
      label='Max Hourly Rate'
      labelFor={MAX_HOURLY_RATE_FIELD}
      required={!hasNoRateLimit}
    >
      <JobMaximumHourlyRateWrapper fieldOptions={fieldOptions}>
        <Form.NumberInput
          name={MAX_HOURLY_RATE_FIELD}
          step='1'
          max='1000'
          min='0'
          icon={<ReferralBonus16 />}
          required={!hasNoRateLimit}
          disabled={hasNoRateLimit}
          width='full'
        />
      </JobMaximumHourlyRateWrapper>
    </GridItemField>
  )
}

export default JobMaximumHourlyRateInput

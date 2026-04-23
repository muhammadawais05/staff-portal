import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { GridItemField } from '@staff-portal/ui'

import {
  COMMITMENT_FIELD,
  EXPECTED_WEEKLY_HOURS_FIELD
} from '../../../../config'
import { JobEditFormValues } from '../../../../types'

export const ExpectedWeeklyHoursInput = () => {
  const {
    input: { value: commitment }
  } = useField<JobEditFormValues[typeof COMMITMENT_FIELD]>(COMMITMENT_FIELD, {
    subscription: { value: true }
  })
  const hourlyCommitment = commitment === EngagementCommitmentEnum.HOURLY

  if (!hourlyCommitment) {
    return null
  }

  return (
    <GridItemField
      label='Expected Weekly Hours'
      labelFor={EXPECTED_WEEKLY_HOURS_FIELD}
      required
      size='small'
    >
      <Form.NumberInput
        name={EXPECTED_WEEKLY_HOURS_FIELD}
        step='1'
        width='full'
        required
      />
    </GridItemField>
  )
}

export default ExpectedWeeklyHoursInput

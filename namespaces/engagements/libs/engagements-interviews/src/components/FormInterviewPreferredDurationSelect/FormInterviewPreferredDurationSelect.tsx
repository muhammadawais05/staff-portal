import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { InterviewPreferredDurations } from '@staff-portal/graphql/staff'

import { formatPreferredDurationsOptions } from './utils'

const options = formatPreferredDurationsOptions(
  Object.keys(InterviewPreferredDurations)
)

const FormInterviewPreferredDurationSelect = () => (
  <Form.Select
    enableReset
    name='preferredDuration'
    label='Interview Length'
    options={options}
    width='full'
    data-testid='ScheduleInterviewForm-preferred-duration'
  />
)

export default FormInterviewPreferredDurationSelect

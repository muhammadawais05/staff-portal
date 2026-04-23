import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { isMaxLength } from '@staff-portal/validators'

import { GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME } from '../ScheduleInterviewForm/ScheduleInterviewForm'

const ScheduleInterviewEventDescriptionField = () => (
  <Form.Input
    multiline
    name={GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME}
    label='Event Description'
    width='full'
    rows={8}
    rowsMax={16}
    validate={isMaxLength}
    data-testid='ScheduleInterviewEventDescriptionField-input'
  />
)

export default ScheduleInterviewEventDescriptionField

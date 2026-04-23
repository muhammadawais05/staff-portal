import { Checkbox, Container } from '@toptal/picasso'
import { Form, useField } from '@toptal/picasso-forms'
import React from 'react'
import { isMaxLength } from '@staff-portal/validators'

import { ScheduleEngagementFragment } from '../../data/fragments/schedule-engagement-fragment'
import ScheduleInterviewEventDescriptionField from '../ScheduleInterviewEventDescriptionField'

export interface Props {
  autoFocus?: boolean
  isClassic: boolean
  scheduleEngagement: ScheduleEngagementFragment
}

const ScheduleInterviewGoogleForm = ({
  autoFocus = false,
  isClassic,
  scheduleEngagement
}: Props) => {
  const { client, talent } = scheduleEngagement

  const {
    input: { value: sendGoogleCalendarInvitation }
  } = useField('sendGoogleCalendarInvitation')

  const hint = isClassic
    ? undefined
    : 'The talent will get the event in his calendar via TopScheduler'

  if (!sendGoogleCalendarInvitation) {
    return null
  }

  return (
    <>
      <Form.Input
        autoFocus={autoFocus}
        name='gcSummary'
        label='Event Title'
        width='full'
        validate={isMaxLength}
        data-testid='ScheduleInterviewGoogleForm-event-title'
      />

      <ScheduleInterviewEventDescriptionField />

      <Form.CheckboxGroup
        name='gcUserReceivers'
        label='Event Receivers'
        hint={hint}
        data-testid='ScheduleInterviewGoogleForm-event-receivers'
      >
        {client?.emailCarbonCopyOptions?.nodes.map(
          ({ role: { email, fullName }, label }) => (
            <Form.Checkbox
              key={email}
              value={email}
              label={`${label} (${fullName} <${email}>)`}
            />
          )
        )}
      </Form.CheckboxGroup>

      {isClassic && talent?.toptalEmail && (
        <Container flex top='xsmall' bottom='medium'>
          <Checkbox
            disabled
            checked
            label={`Talent (${talent.fullName} <${talent.toptalEmail}>)`}
            data-testid='ScheduleInterviewGoogleForm-event-receiver-talent'
          />
        </Container>
      )}

      <Form.Input
        name='gcEmails'
        label='Additional Event Receivers'
        width='full'
        validate={isMaxLength}
        placeholder='e.g., janesmith@toptal.com, jonsmith@toptal.com'
        data-testid='ScheduleInterviewGoogleForm-additional-event-receivers'
      />
    </>
  )
}

export default ScheduleInterviewGoogleForm

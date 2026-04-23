import React from 'react'
import { Section, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'

import { getOptionLabelWithName } from './utils'
import { DoNotSendEmailSenderValue } from '../../constants'

export interface Props {
  claimer?: Maybe<{
    id: string
    fullName?: Maybe<string>
  }>
  clientPartner?: Maybe<{
    id: string
    fullName?: Maybe<string>
  }>
  hasToptalProjects: boolean
}

const EmailOptionsSection = ({
  claimer,
  clientPartner,
  hasToptalProjects
}: Props) => {
  const sharedRadioProps = {
    disabled: hasToptalProjects
  }

  return (
    <Section
      variant='withHeaderBar'
      title='Email Options'
      data-testid='email-options-section'
    >
      <Form.RadioGroup name='senderId'>
        {claimer && (
          <Form.Radio
            label={getOptionLabelWithName({
              label: 'Matcher',
              fullName: claimer.fullName
            })}
            value={claimer.id}
            {...sharedRadioProps}
          />
        )}

        {clientPartner && (
          <Form.Radio
            label={getOptionLabelWithName({
              label: 'Client Partner',
              fullName: clientPartner.fullName
            })}
            value={clientPartner.id}
            {...sharedRadioProps}
          />
        )}

        <Form.Radio
          label='Do not send email'
          titleCase={false}
          value={DoNotSendEmailSenderValue}
          {...sharedRadioProps}
        />

        {hasToptalProjects && (
          <Typography size='small' color='red'>
            You cannot send a Talent Pitch for a Projects Jobs
          </Typography>
        )}
      </Form.RadioGroup>
    </Section>
  )
}

export default EmailOptionsSection

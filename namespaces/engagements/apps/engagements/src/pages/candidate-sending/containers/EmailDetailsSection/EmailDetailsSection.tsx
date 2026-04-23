import React from 'react'
import { Section } from '@toptal/picasso'
import {
  SendEmailModal as SEM,
  SendEmailProvider
} from '@staff-portal/communication-send-email'
import { Maybe } from '@staff-portal/graphql/staff'
import { getRoleTypeText } from '@staff-portal/facilities'

import {
  PitchStepTalentFragment,
  PitchStepEmailContextFragment
} from '../../data/get-pitch-step-data'

export type Props = {
  sender?: Maybe<PitchStepTalentFragment>
  emailContext?: Maybe<PitchStepEmailContextFragment['pitchEmailMessaging']>
}

const EmailDetailsSection = ({ emailContext, sender }: Props) => {
  if (!emailContext) {
    return null
  }

  const roleType = getRoleTypeText(sender?.type).toLowerCase()

  return (
    <Section
      variant='withHeaderBar'
      title={`Explain why this ${roleType} is an excellent fit for the job`}
      data-testid='email-details-section'
    >
      <SendEmailProvider emailContext={emailContext}>
        <SEM.SubjectField label='Subject' />
        <SEM.ToField alwaysDisplay />
        <SEM.CCSuggestedField />
        <SEM.CCAdditionalField />
        <SEM.CCExternalField />
      </SendEmailProvider>
    </Section>
  )
}

export default EmailDetailsSection

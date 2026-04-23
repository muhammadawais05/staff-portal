import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'

import {
  BillRateField,
  ContactDetailsField,
  CustomClosingField,
  PitchTextField,
  ScheduleInterviewButtonField,
  SignatureField
} from './components'
import {
  PitchStepJobFragment,
  PitchStepPitchEmailMessagingFragment,
  PitchStepTalentFragment
} from '../../data/get-pitch-step-data'

export type Props = {
  job?: Maybe<PitchStepJobFragment>
  pitchEmailMessaging?: Maybe<PitchStepPitchEmailMessagingFragment>
  senderId?: Maybe<string>
  talent?: Maybe<PitchStepTalentFragment>
  isPitchTextEnabled: boolean
  showTalentCardPreview?: boolean
}

const EmailComposerFields = ({
  job,
  pitchEmailMessaging,
  senderId,
  talent,
  isPitchTextEnabled,
  showTalentCardPreview
}: Props) => (
  <>
    <PitchTextField isPitchTextEnabled={isPitchTextEnabled} />

    <ScheduleInterviewButtonField
      talent={talent}
      jobId={job?.id}
      showTalentCardPreview={showTalentCardPreview}
    />

    <ContactDetailsField />

    <BillRateField />

    <CustomClosingField />

    <SignatureField
      senderId={senderId}
      claimerId={job?.claimer?.id}
      clientPartnerId={job?.client.clientPartner?.id}
      claimerSignOff={pitchEmailMessaging?.claimerSignOff}
      clientPartnerSignOff={pitchEmailMessaging?.clientPartnerSignOff}
    />
  </>
)

export default EmailComposerFields

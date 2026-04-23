import React from 'react'
import { Container } from '@toptal/picasso'
import { Maybe, TalentCumulativeStatus } from '@staff-portal/graphql/staff'

const REASON_FOR_PAUSING_TRANSLATIONS: Record<string, string> = {
  verification_failure: 'Verification failure',
  inactivity: 'Inactivity'
}

interface Props {
  reasonForPausingDisplayKey: Maybe<string> | undefined
  cumulativeStatus: TalentCumulativeStatus
}

const ReasonForPausing = ({
  reasonForPausingDisplayKey,
  cumulativeStatus
}: Props) => {
  if (cumulativeStatus !== TalentCumulativeStatus.PAUSED) {
    return null
  }

  if (!reasonForPausingDisplayKey) {
    return null
  }

  const reason = REASON_FOR_PAUSING_TRANSLATIONS[reasonForPausingDisplayKey]

  return <Container>Reason for pausing: {reason}</Container>
}

export default ReasonForPausing

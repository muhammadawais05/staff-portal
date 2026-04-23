import React from 'react'
import { Container, Image } from '@toptal/picasso'
import {
  Operation,
  Verification,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'

import ApproveIdVerificationButton from './components/ApproveIdVerificationButton'
import ReasonForPausing from './components/ReasonForPausing'
import { getStatus } from './utils/get-status'

export type Props = {
  cumulativeStatus: TalentCumulativeStatus
  operation: Operation
  recentIdVerification: Verification
  talentId: string
}

export const IdVerificationField = ({
  cumulativeStatus,
  operation,
  recentIdVerification,
  talentId
}: Props) => {
  const {
    statusDisplayKey,
    legalName,
    remainingAttempts,
    automaticMeetingCancellationCount,
    selfieUrl,
    reasonForPausingDisplayKey
  } = recentIdVerification

  return (
    <Container data-testid='id-verification-field'>
      <Container>Status: {getStatus(statusDisplayKey)}</Container>

      <Container>Remaining attempts: {remainingAttempts}</Container>

      <ReasonForPausing
        reasonForPausingDisplayKey={reasonForPausingDisplayKey}
        cumulativeStatus={cumulativeStatus}
      />

      <Container>
        Automatic meeting cancellation count:{' '}
        {automaticMeetingCancellationCount}
      </Container>

      <Container>Legal name from ID: {legalName || '-'}</Container>

      {selfieUrl && (
        <Container bottom='xsmall'>
          Photo:
          <Container>
            <Image
              alt='selfie'
              data-testid='recent-id-verification-selfie'
              src={selfieUrl}
              height='240'
            />
          </Container>
        </Container>
      )}
      <Container>
        <ApproveIdVerificationButton
          talentId={talentId}
          operation={operation}
        />
      </Container>
    </Container>
  )
}

export default IdVerificationField

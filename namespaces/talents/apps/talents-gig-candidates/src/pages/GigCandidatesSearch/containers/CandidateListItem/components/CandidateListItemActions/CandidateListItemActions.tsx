import React, { memo } from 'react'
import { Container } from '@toptal/picasso'
import { Operation } from '@staff-portal/graphql/staff'
import {
  PublicationGigType,
  SendReachOutButton
} from '@staff-portal/talents-gigs'
import {
  PublicLink,
  TalentAvailabilitySubscriptionFragment
} from '@staff-portal/talents'

import SubscribeToAvailabilityButton from '../SubscribeToAvailabilityButton/SubscribeToAvailabilityButton'

interface Props {
  talentId: string
  talentName: string
  talentResumeUrl: string
  talentSuspended?: boolean | null
  request: PublicationGigType
  talentAvailabilitySubscription?: TalentAvailabilitySubscriptionFragment | null
  operations: { [key: string]: Operation }
}

const CandidateListItemActions = ({
  talentId,
  talentName,
  talentResumeUrl,
  request,
  talentAvailabilitySubscription,
  operations
}: Props) => {
  return (
    <>
      <PublicLink url={talentResumeUrl}>Public Profile</PublicLink>
      <SubscribeToAvailabilityButton
        talentAvailabilitySubscription={talentAvailabilitySubscription}
        operation={operations.subscribeToTalentAvailabilityUpdates}
        talentId={talentId}
      />
      <Container left='small'>
        {request?.id && (
          <SendReachOutButton
            candidateId={talentId}
            gigId={request.id}
            requestTitle={request.title}
            talentName={talentName}
            operation={operations.createP2PReachOut}
          />
        )}
      </Container>
    </>
  )
}

export default memo(CandidateListItemActions)

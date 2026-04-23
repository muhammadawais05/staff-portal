import React, { ReactNode } from 'react'
import {
  EngagementStatus,
  InterviewStatus,
  Maybe
} from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

import { RelationshipStatus } from '../../enums'
import getRelationshipTextMapping from '../get-relationship-text-mapping'
import { PreviousTalentEngagementForClientFragment } from '../../../../../../data/get-availability-step-data'

// eslint-disable-next-line complexity
const getRelationshipTextElement = ({
  previousTalentEngagementForClient,
  talentFullName,
  talentProfileLink
}: {
  previousTalentEngagementForClient: PreviousTalentEngagementForClientFragment
  talentFullName: string
  talentProfileLink?: Maybe<string>
}): ReactNode => {
  const talentProfileLinkElement = (
    <LinkWrapper
      wrapWhen={Boolean(talentProfileLink)}
      href={talentProfileLink as string}
    >
      {talentFullName}
    </LinkWrapper>
  )

  const externalInterview =
    previousTalentEngagementForClient.latestExternalInterview?.nodes?.[0] ??
    previousTalentEngagementForClient.newExternalInterview
  let relationshipStatus: RelationshipStatus

  switch (previousTalentEngagementForClient.status) {
    case EngagementStatus.ACTIVE:
    case EngagementStatus.ON_BREAK:
    case EngagementStatus.END_SCHEDULED:
    case EngagementStatus.CLOSED:
    case EngagementStatus.ON_TRIAL:
      // if talent was hired for that job or if they have a pending trial
      relationshipStatus = RelationshipStatus.EngagementSuccessful
      break
    case EngagementStatus.REJECTED_TRIAL:
      // if talent was not hired for that job and had a trial for that job
      relationshipStatus = RelationshipStatus.TalentRejectedAfterTrial
      break
    case EngagementStatus.REJECTED_INTERVIEW:
      relationshipStatus =
        externalInterview?.status === InterviewStatus.REJECTED
          ? RelationshipStatus.TalentRejectedAfterInterview
          : RelationshipStatus.TalentRejectedBeforeInterview
      break
    case EngagementStatus.CANCELLED:
    case EngagementStatus.CANCELLED_DRAFT:
      if (
        externalInterview?.status &&
        [
          InterviewStatus.ACCEPTED,
          InterviewStatus.REJECTED,
          InterviewStatus.MISSED
        ].includes(externalInterview.status)
      ) {
        // if engagement is cancelled and there was an interview scheduled and engagement cancelled after interview time
        relationshipStatus =
          RelationshipStatus.EngagementCancelledAfterInterview
      } else {
        // if talent was not hired for that job and did not have a trial
        // for that job and (either the interview was never scheduled
        // OR the client did not accept or reject the talent after
        // the scheduled interview OR the engagement was cancelled
        // before interview time)
        relationshipStatus =
          RelationshipStatus.EngagementCancelledBeforeInterview
      }
      break
    default:
      relationshipStatus = RelationshipStatus.TalentWasPreviouslyIntroduced
  }

  return getRelationshipTextMapping(talentProfileLinkElement)[
    relationshipStatus
  ]
}

export default getRelationshipTextElement

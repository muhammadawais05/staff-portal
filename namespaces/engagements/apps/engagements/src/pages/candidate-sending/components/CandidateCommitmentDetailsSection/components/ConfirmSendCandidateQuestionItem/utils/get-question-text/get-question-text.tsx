import React, { ReactNode } from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import { Maybe } from '@staff-portal/graphql/staff'
import { Typography } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { COMMITMENT_AVAILABILITY_MAPPING } from '@staff-portal/engagements'

import { PreviousTalentEngagementForClientFragment } from '../../../../../../data/get-availability-step-data'
import getRelationshipTextElement from '../get-relationship-text-element'

const getQuestionText = ({
  previousTalentEngagementForClient,
  talentFullName,
  talentProfileLink
}: {
  previousTalentEngagementForClient: PreviousTalentEngagementForClientFragment
  talentFullName: string
  talentProfileLink?: Maybe<string>
}): ReactNode => {
  const relationshipTextElement = getRelationshipTextElement({
    previousTalentEngagementForClient,
    talentFullName,
    talentProfileLink
  })

  const { webResource: jobWebResource } =
    previousTalentEngagementForClient.job ?? {}
  const { availability, adjustedCompanyRate, adjustedTalentRate } =
    previousTalentEngagementForClient.currentCommitment ?? {}

  return (
    <>
      {relationshipTextElement}
      {' the '}
      {!!availability &&
        `${COMMITMENT_AVAILABILITY_MAPPING[availability].toLowerCase()} `}
      {'job titled '}
      <LinkWrapper
        wrapWhen={Boolean(jobWebResource?.url)}
        href={jobWebResource?.url as string}
      >
        {jobWebResource?.text}
      </LinkWrapper>
      {' at the rate of '}
      <Typography weight='semibold' as='span'>
        {adjustedCompanyRate?.value
          ? `${formatAmount({
              amount: adjustedCompanyRate.value
            })}/hour`
          : NO_VALUE}
      </Typography>
      {' for client and '}
      <Typography weight='semibold' as='span'>
        {adjustedTalentRate?.value
          ? `${formatAmount({
              amount: adjustedTalentRate.value
            })}/hour`
          : NO_VALUE}
      </Typography>
      {
        ' for talent. Are you sure you want to send this candidate to the client?'
      }
    </>
  )
}

export default getQuestionText

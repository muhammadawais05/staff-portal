import React from 'react'
import { Container } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { ENGAGEMENT_COMMITMENT_MAPPING } from '@staff-portal/engagements'

import { TalentAvailabilityFragment } from '../../../../data'

type EndingEngagement = ArrayItem<
  NonNullable<TalentAvailabilityFragment['endingEngagements']>['nodes']
>

interface Props {
  endingEngagement: EndingEngagement | null | undefined
}

const EndingEngagementLabel = ({ endingEngagement }: Props) => {
  if (!endingEngagement) {
    return null
  }

  const endDate =
    endingEngagement.endDate || endingEngagement.proposedEnd?.endDate

  if (!endingEngagement.job?.claimer || !endDate) {
    return null
  }

  const {
    id,
    commitment,
    job: {
      claimer: {
        fullName: claimerName,
        webResource: { url: claimerLink }
      }
    },
    webResource: { url: engagementLink, text: engagementText }
  } = endingEngagement

  const commitmentTitle =
    ENGAGEMENT_COMMITMENT_MAPPING[commitment].toLowerCase()

  return (
    <Container data-testid='ending-engagement-label' top='xsmall' key={id}>
      Current {commitmentTitle} engagement{' '}
      <LinkWrapper
        href={engagementLink as string}
        wrapWhen={Boolean(engagementLink)}
      >
        {engagementText}
      </LinkWrapper>{' '}
      ends in {getDateDistanceFromNow(endDate, { hideSuffix: true })}. Contact{' '}
      <LinkWrapper href={claimerLink as string} wrapWhen={Boolean(claimerLink)}>
        {claimerName}
      </LinkWrapper>
      .
    </Container>
  )
}

export default EndingEngagementLabel

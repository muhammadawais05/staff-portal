import React from 'react'
import { JobCommitment, Maybe } from '@staff-portal/graphql/staff'
import {
  QuestionMark16,
  Container,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'

import {
  extractJobCommitments,
  EngagementCommitment,
  hasScheduledChange
} from '../../../../utils/format-commitment'
import { COMMITMENT_COLORS, COMMITMENT_TITLES } from '../../../../config'

type Props = {
  commitment?: Maybe<JobCommitment>
  currentEngagement?: Maybe<EngagementCommitment>
  showTooltip?: boolean
  tooltipText?: string
}

const CommitmentFormatter = ({
  commitment,
  currentEngagement,
  showTooltip = false,
  tooltipText
}: Props) => {
  const { currentCommitment, nextCommitment } = extractJobCommitments({
    currentEngagement,
    commitment
  })
  const scheduledChange = hasScheduledChange(currentCommitment, nextCommitment)

  return (
    <Container flex alignItems='center'>
      {commitment && (
        <TypographyOverflow
          as='span'
          weight='semibold'
          size='medium'
          color={COMMITMENT_COLORS[commitment]}
        >
          {COMMITMENT_TITLES[commitment]}
        </TypographyOverflow>
      )}

      {currentCommitment && nextCommitment && (
        <TypographyOverflow
          as='span'
          weight='semibold'
          color={COMMITMENT_COLORS[currentCommitment]}
        >
          {`${COMMITMENT_TITLES[currentCommitment]}${
            scheduledChange
              ? ` (scheduled change to ${COMMITMENT_TITLES[nextCommitment]})`
              : ''
          }`}
        </TypographyOverflow>
      )}

      {showTooltip && (
        <Tooltip interactive content={tooltipText}>
          <Container left='xsmall' flex>
            <QuestionMark16 color='gray' />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default CommitmentFormatter

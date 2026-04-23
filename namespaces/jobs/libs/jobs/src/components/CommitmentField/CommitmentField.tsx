import React from 'react'
import { Container, Typography, QuestionMark16, Tooltip } from '@toptal/picasso'

import {
  extractJobCommitments,
  hasScheduledChange,
  getCommitmentTitle,
  shouldRenderCommitment
} from '../../utils'
import CommitmentText from './components/CommitmentText'
import { JobListItemFragment } from '../JobListItem/data'

export type Props = {
  job: Pick<
    JobListItemFragment,
    'currentEngagement' | 'commitment' | 'talentCount' | 'status'
  >
}

const CommitmentField = ({ job }: Props) => {
  const {
    nextCommitment: currentEngagementCommitment,
    desiredCommitment: jobCommitment,
    currentCommitment
  } = extractJobCommitments({
    commitment: job?.commitment,
    currentEngagement: job?.currentEngagement
  })

  if (!job.talentCount) {
    return null
  }

  const jobCommitmentDiffers = jobCommitment !== currentEngagementCommitment

  const changeScheduled = hasScheduledChange(
    currentCommitment,
    currentEngagementCommitment
  )

  const showTooltip = Boolean(jobCommitmentDiffers)

  const shouldRenderCommitmentField = shouldRenderCommitment({
    talentCount: job.talentCount,
    jobStatus: job.status,
    currentEngagement: job?.currentEngagement
  })

  return (
    <Container flex alignItems='center'>
      <CommitmentText
        commitment={
          shouldRenderCommitmentField
            ? currentEngagementCommitment
            : jobCommitment
        }
      />
      {showTooltip && (
        <Tooltip
          interactive
          content={
            <Typography>
              {changeScheduled && (
                <Typography>
                  Commitment scheduled to change to{' '}
                  {getCommitmentTitle(
                    currentEngagementCommitment
                  ).toLowerCase()}
                </Typography>
              )}
              {shouldRenderCommitmentField && !changeScheduled
                ? `Desired commitment: ${getCommitmentTitle(jobCommitment)}`
                : `Commitment: ${getCommitmentTitle(
                    currentEngagementCommitment
                  )}`}
            </Typography>
          }
        >
          <Container left='xsmall' flex>
            <QuestionMark16
              color='gray'
              data-testid='commitment-question-mark-icon'
            />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default CommitmentField

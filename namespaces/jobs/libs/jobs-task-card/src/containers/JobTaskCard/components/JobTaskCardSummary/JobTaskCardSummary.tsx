import React from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { isNumber } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { titleize } from '@staff-portal/string'
import { TaskCardLayout } from '@staff-portal/tasks'

import { JobFragment } from '../../data'
import JobTaskCardStatus from '../JobTaskCardStatus'
import * as S from './styles'

const getJobTypeContent = (jobType: string, commitmentLabel: string) => (
  <Container
    inline
    flex
    direction='row'
    alignItems='baseline'
    css={S.jobTypeContainer}
  >
    <TypographyOverflow as='span' weight='semibold' color='black'>
      {titleize(jobType)}
    </TypographyOverflow>
    <Typography as='span' size='xsmall'>
      <span css={S.jobTypeCommitment}>{commitmentLabel}</span>
    </Typography>
  </Container>
)

export interface Props {
  job: JobFragment
}

const JobTaskCardSummary = ({ job }: Props) => {
  const { jobType, totalHours, commitment, currentEngagement } = job
  const commitmentLabel = commitment
    ? titleize(commitment, { capitalizeAllWords: false })
    : 'Not specified'

  return (
    <TaskCardLayout.Summary>
      <JobTaskCardStatus job={job} />
      <TaskCardLayout.SummaryItem
        label='Job type'
        value={getJobTypeContent(jobType, commitmentLabel)}
      />
      <TaskCardLayout.SummaryItem
        label='Total hours'
        value={
          isNumber(totalHours) && (
            <Container flex as='span'>
              <TypographyOverflow as='span' weight='semibold' color='black'>
                {`${totalHours}h`}
              </TypographyOverflow>
            </Container>
          )
        }
      />
      <TaskCardLayout.SummaryItem
        label='Billing cycles'
        value={
          <Container flex as='span'>
            <TypographyOverflow as='span' weight='semibold' color='black'>
              {currentEngagement?.nodes[0]?.accessibleBillingCycles
                .totalCount ?? NO_VALUE}
            </TypographyOverflow>
          </Container>
        }
      />
    </TaskCardLayout.Summary>
  )
}

export default JobTaskCardSummary

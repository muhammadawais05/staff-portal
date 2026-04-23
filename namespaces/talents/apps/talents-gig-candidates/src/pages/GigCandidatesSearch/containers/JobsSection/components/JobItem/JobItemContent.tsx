import React from 'react'
import { Container, Typography, Tooltip, QuestionMark16 } from '@toptal/picasso'
import {
  getEngagementStatusColor,
  getEngagementDetailedStatus,
  getEngagementStatusTooltip
} from '@staff-portal/engagements-interviews'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'
import { CandidateJobsEngagementFragment } from '../../data/get-candidate-jobs/get-candidate-jobs.staff.gql.types'
import { SkillPair } from '../../../../types'
import JobLink from '../JobLink'
import SkillsList from '../../../../components/SkillsList'

interface Props {
  engagement: CandidateJobsEngagementFragment
  talentSkills?: SkillPair[]
}

const JobItemContent = ({ engagement, talentSkills }: Props) => {
  const { client, status, cumulativeStatus, interview, job } = engagement

  if (!status || !cumulativeStatus) {
    return <>{NO_VALUE}</>
  }

  const statusText = getEngagementDetailedStatus(engagement)

  const statusColor = getEngagementStatusColor({
    status,
    cumulativeStatus,
    interview
  })

  const tooltipContent = getEngagementStatusTooltip(engagement, {
    type: 'extended',
    ...engagement
  })

  const skills = job?.skillSets?.nodes
    ? job.skillSets.nodes.map(({ skill: { name } }) => name)
    : []

  return (
    <Container css={S.summaryContainer}>
      <Container direction='column' css={S.jobContainer}>
        {job && <JobLink job={job} />}
        <Container
          bottom='xsmall'
          flex
          alignItems='center'
          css={S.clientContainer}
        >
          <Container right='xsmall'>
            <Typography size='medium' color='dark-grey' css={S.client}>
              {client?.fullName} •
            </Typography>
          </Container>
          <Container forwardedAs='span' flex alignItems='center' css={S.client}>
            <Typography
              color={statusColor}
              size='medium'
              data-testid='engagement-status'
            >
              {statusText}
              {tooltipContent && (
                <Tooltip
                  interactive
                  content={getEngagementStatusTooltip(engagement, {
                    type: 'extended',
                    ...engagement
                  })}
                >
                  <Container as='span' left='xsmall' data-testid='tooltip-icon'>
                    <QuestionMark16 color='dark-grey' />
                  </Container>
                </Tooltip>
              )}
            </Typography>
          </Container>
        </Container>
      </Container>
      <SkillsList skills={skills} talentSkills={talentSkills} />
    </Container>
  )
}

export default JobItemContent

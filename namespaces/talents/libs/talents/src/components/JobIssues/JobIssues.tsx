import React from 'react'
import {
  Typography,
  Tooltip,
  ExclamationSolid16,
  ColorType,
  Container
} from '@toptal/picasso'
import { TalentJobIssue } from '@staff-portal/graphql/staff'

import { StatusJobIssuesFragment } from '../../data'

export interface Props {
  jobIssues?: StatusJobIssuesFragment | null
}

export const JOB_ISSUES_STATUS_COLOR_MAP: Record<
  Exclude<TalentJobIssue, TalentJobIssue.OK>,
  ColorType | 'blue'
> = {
  [TalentJobIssue.FULL_RESTRICTION]: 'black',
  [TalentJobIssue.CRITICAL]: 'red',
  [TalentJobIssue.MISMATCHED]: 'blue',
  [TalentJobIssue.WARNING]: 'yellow'
}

const getJobIssuesIcon = (status: TalentJobIssue) => {
  if (status === TalentJobIssue.OK) {
    return null
  }

  return <ExclamationSolid16 color={JOB_ISSUES_STATUS_COLOR_MAP[status]} />
}

const getJobIssuesTooltipContent = (
  failedMetrics: StatusJobIssuesFragment['failedMetrics']
) => {
  return (
    <>
      {failedMetrics.map(({ name, message }) => (
        <Typography
          data-testid='JobIssues-tooltip-content'
          key={name}
        >{`— ${message}`}</Typography>
      ))}
    </>
  )
}

export const JobIssues = ({ jobIssues }: Props) => {
  if (!jobIssues || jobIssues.status === TalentJobIssue.OK) {
    return null
  }

  return (
    <Tooltip
      content={getJobIssuesTooltipContent(jobIssues.failedMetrics)}
      data-testid='JobIssues-tooltip'
    >
      <Container flex inline alignItems='center' data-testid='job-issues-icon'>
        {getJobIssuesIcon(jobIssues.status)}
      </Container>
    </Tooltip>
  )
}

export default JobIssues

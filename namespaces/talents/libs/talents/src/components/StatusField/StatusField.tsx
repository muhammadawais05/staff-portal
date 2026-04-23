import React from 'react'
import {
  Container,
  Typography,
  Tag,
  Tooltip,
  ExclamationSolid16
} from '@toptal/picasso'
import {
  TalentCumulativeStatus,
  TalentJobIssue
} from '@staff-portal/graphql/staff'
import { DetailedListValueViewOptions } from '@staff-portal/ui'
import { useUserDateFormatter } from '@staff-portal/current-user'

import JobIssues from '../JobIssues'
import { StatusJobIssuesFragment } from '../../data'
import { TALENT_STATUS_MAPPING } from '../../services'
import { TalentInvestigation } from '../../types'

type Formatter = (input: string) => string

type Investigations = { nodes: TalentInvestigation[] }

export interface Props {
  cumulativeStatus: TalentCumulativeStatus
  investigations: Investigations | null | undefined
  jobIssues?: StatusJobIssuesFragment
  newcomer: boolean
  topShield?: boolean | null
  options?: DetailedListValueViewOptions
}

const getInvestigation = (
  formatter: Formatter,
  hasJobIssues: boolean,
  investigations?: Investigations | null
) => {
  if (!investigations?.nodes || hasJobIssues) {
    return null
  }
  const currentInvestigation = investigations.nodes[0]

  const message = (
    <Typography>
      {`Investigation since ${formatter(currentInvestigation.startedAt)}`}
    </Typography>
  )

  return (
    <Tooltip content={message}>
      <span data-testid='investigations-icon'>
        <ExclamationSolid16 color='grey' />
      </span>
    </Tooltip>
  )
}

const getStatusText = ({
  cumulativeStatus,
  isJobContext,
  hasInvestigation,
  options
}: {
  cumulativeStatus: TalentCumulativeStatus
  isJobContext: boolean
  hasInvestigation: boolean
  options?: DetailedListValueViewOptions
}) => {
  let color = TALENT_STATUS_MAPPING[cumulativeStatus].color
  const text = TALENT_STATUS_MAPPING[cumulativeStatus].text

  if (hasInvestigation && !isJobContext) {
    color = 'red'
  }

  return (
    <Typography
      color={color}
      size={options?.size}
      weight={options?.weight}
      titleCase
    >
      {text}
    </Typography>
  )
}

const getStatusIcon = ({
  isJobContext,
  hasInvestigation,
  investigations,
  formatDate,
  jobIssues
}: {
  isJobContext: boolean
  hasInvestigation: boolean
  investigations: Investigations | null | undefined
  formatDate: Formatter
  jobIssues?: StatusJobIssuesFragment
}) => {
  const displayJobIssues = Boolean(
    isJobContext && jobIssues?.status !== TalentJobIssue.OK
  )
  const displayInvestigation = !isJobContext && hasInvestigation

  if (!displayJobIssues && !displayInvestigation) {
    return null
  }

  return (
    <Container flex left='xsmall'>
      {displayJobIssues && <JobIssues jobIssues={jobIssues} />}
      {displayInvestigation &&
        getInvestigation(formatDate, displayJobIssues, investigations)}
    </Container>
  )
}

export const StatusField = ({
  cumulativeStatus,
  newcomer,
  topShield,
  options,
  jobIssues,
  investigations
}: Props) => {
  const formatDate = useUserDateFormatter()
  const isJobContext = Boolean(jobIssues)
  const hasInvestigation = (investigations?.nodes ?? []).some(
    investigation => investigation.resolvedAt === null
  )

  return (
    <Container flex alignItems='center'>
      {getStatusText({
        cumulativeStatus,
        isJobContext,
        hasInvestigation,
        options
      })}
      {getStatusIcon({
        isJobContext,
        hasInvestigation,
        investigations,
        formatDate,
        jobIssues
      })}
      {(topShield || newcomer) && (
        <Container flex left='xsmall'>
          <Tag.Rectangular indicator='green'>
            {topShield ? 'TopShield' : 'Newcomer'}
          </Tag.Rectangular>
        </Container>
      )}
    </Container>
  )
}

export default StatusField

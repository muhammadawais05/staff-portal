import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import pluralize from 'pluralize'
import { NO_VALUE } from '@staff-portal/config'

import { TalentCoachingEngagementFragment } from '../../../../data/talent-coaching-engagement-fragment'
import * as S from './styles'

interface Props {
  applicationStatus?: TalentCoachingEngagementFragment['applicationStatus']
}

const pluralizeAbbreviation = (abbreviation: string, count?: number) => {
  const result = count === 1 ? abbreviation : `${abbreviation}s`

  return `${count ?? 0} ${result}`
}

const ApplicationStatusField = ({ applicationStatus }: Props) => {
  if (!applicationStatus) {
    return <>{NO_VALUE}</>
  }

  const {
    totalEngagementCount,
    totalJobApplicationCount,
    totalAvailabilityRequestCount,
    confirmedAvailabilityRequestCount,
    statusRetentionDays,
    totalInterviewCount,
    successfulInterviewCount,
    rejectedInterviewCount,
    cancelledInterviewCount
  } = applicationStatus

  const jars = pluralizeAbbreviation('JA', totalJobApplicationCount)
  const ars = pluralizeAbbreviation('AR', totalAvailabilityRequestCount)
  const confirmedARs = `${confirmedAvailabilityRequestCount} confirmed`
  const engagements = pluralize('engagement', totalEngagementCount, true)
  const interviews = pluralize('interview', totalInterviewCount, true)
  const cancelledInterviews = `${cancelledInterviewCount} canceled ${pluralize(
    'interview',
    cancelledInterviewCount
  )}`
  const rejectedInterviews = `${rejectedInterviewCount} rejected ${pluralize(
    'interview',
    rejectedInterviewCount
  )}`
  const successfulInterviews = `${successfulInterviewCount} successful ${pluralize(
    'interview',
    successfulInterviewCount
  )}`

  return (
    <Container flex justifyContent='space-between'>
      <Container>
        <Typography size='medium'>
          {jars} + {ars} ({confirmedARs}) → {engagements} → {interviews}
        </Typography>
        <Typography size='medium'>
          {cancelledInterviews}, {rejectedInterviews}, {successfulInterviews}
        </Typography>
        <Typography size='medium'>
          Succesful/Total Interviews: {successfulInterviewCount}/
          {totalInterviewCount}
        </Typography>
      </Container>
      <Container>
        <Typography size='medium' css={S.statusRetentionDays}>
          Last {pluralize('day', statusRetentionDays, true)}
        </Typography>
      </Container>
    </Container>
  )
}

export default ApplicationStatusField

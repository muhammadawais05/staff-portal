import React from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

export const getStatusWithCommentMessageMapping = ({
  performer,
  date,
  talentType
}: {
  performer: JSX.Element | string
  date?: string | null
  talentType: string
}) => ({
  [EngagementStatus.REJECTED_INTERVIEW]: (
    <>
      {performer} rejected {talentType}'s interview with comment:
    </>
  ),
  [EngagementStatus.REJECTED_TRIAL]: (
    <>
      {performer} rejected {talentType}'s trial with comment:
    </>
  ),
  [EngagementStatus.CANCELLED]: (
    <>{performer} cancelled interview with comment:</>
  ),
  [EngagementStatus.EXPIRATION_POSTPONED]: (
    <>
      {performer} postponed interview expiration till {parseAndFormatDate(date)}{' '}
      with comment:
    </>
  )
})

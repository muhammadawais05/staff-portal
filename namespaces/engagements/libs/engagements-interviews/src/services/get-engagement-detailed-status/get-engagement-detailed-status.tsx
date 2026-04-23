import { getFormattedDate } from '@staff-portal/date-time-utils'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { EngagementDetailedStatusData } from '../../types'
import { joinTimes } from './utils'

const getTalentSentData = (engagement: EngagementDetailedStatusData) => {
  const talentSentWhen = getFormattedDate(
    engagement.restoredAt || engagement.createdAt
  )
  const talentSentTime = getFormattedDate(
    engagement.restoredAt || engagement.createdAt,
    'time'
  )

  return { talentSentWhen, talentSentTime }
}

const getInterviewNumberText = (engagement: EngagementDetailedStatusData) =>
  engagement.interviews && engagement.interviews?.totalCount > 1
    ? `(${engagement.interviews.totalCount}) `
    : ``

const getEngagementDetailedStatus = (
  engagement: EngagementDetailedStatusData
) => {
  const talentType = engagement.talent?.type

  const { talentSentWhen, talentSentTime } = getTalentSentData(engagement)

  const startDate = getFormattedDate(engagement.startDate)
  const rejectDate = getFormattedDate(engagement.rejectDate)
  const endDate = getFormattedDate(engagement.endDate)

  const interviewDate = getFormattedDate(engagement.interview?.interviewTime)
  const interviewTime = getFormattedDate(
    engagement.interview?.interviewTime,
    'time'
  )

  const internalInterviewDate = getFormattedDate(
    engagement.internalInterview?.interviewTime
  )

  const interviewNumber = getInterviewNumberText(engagement)

  const isTrial = engagement.trialLength === 0
  const trialEndDate = getFormattedDate(engagement.trialEndDate)

  const onHoldStartDate = getFormattedDate(engagement.onHoldStartDate)
  const scheduledAtTimes = joinTimes(engagement.interview?.scheduledAtTimes)

  const activeBreakStartDate = getFormattedDate(
    engagement.currentEngagementBreak?.startDate
  )
  const activeBreakEndDate = getFormattedDate(
    engagement.currentEngagementBreak?.endDate
  )

  const wasScheduled = engagement.interview?.interviewTime
    ? `was scheduled for ${interviewDate}`
    : 'never scheduled'
  const confirmedBy = engagement.interview?.meeting?.topSchedulerMeeting
    ? 'Top Scheduler'
    : talentType || 'candidate'

  const verifiedBy = engagement.interview?.verifierName

  const map = {
    [EngagementCumulativeStatus.DRAFT]: 'Draft',
    [EngagementCumulativeStatus.READY_TO_SEND]: 'Approved',
    [EngagementCumulativeStatus.CANCELLED]: 'Interview cancelled',
    [EngagementCumulativeStatus.CANCELLED_DRAFT]: 'Draft Cancelled',
    [EngagementCumulativeStatus.PENDING]: `Sent on ${talentSentWhen} at ${talentSentTime} - pending review`,
    [EngagementCumulativeStatus.PENDING_APPROVAL]: 'Pending Approval',
    [EngagementCumulativeStatus.REJECTED_DRAFT]: 'Rejected',
    [EngagementCumulativeStatus.UNSAVED_DRAFT]: 'Unsaved Draft',
    [EngagementCumulativeStatus.PENDING_LEGAL]: isTrial
      ? `Pending legal. Start date scheduled for ${startDate}`
      : `Pending legal. Trial scheduled to begin ${startDate}`,
    [EngagementCumulativeStatus.EXPIRED]: 'Interview expired',
    [EngagementCumulativeStatus.PENDING_EXPIRATION]: `Interview pending expiration, ${wasScheduled}`,
    [EngagementCumulativeStatus.EXPIRATION_POSTPONED]:
      'Engagement expiration postponed',
    [EngagementCumulativeStatus.REJECTED_INTERVIEW]:
      'Rejected during interview',
    [EngagementCumulativeStatus.SCHEDULED]: isTrial
      ? `Start date scheduled for ${startDate}`
      : `Trial period starts on ${startDate}`,
    [EngagementCumulativeStatus.ON_TRIAL]: `On trial since ${startDate} to ${trialEndDate}`,
    [EngagementCumulativeStatus.ON_HOLD]: `On hold since ${onHoldStartDate}`,
    [EngagementCumulativeStatus.ACTIVE]: `Active since ${startDate}`,
    [EngagementCumulativeStatus.END_SCHEDULED]: `Active since ${startDate} to ${endDate}`,
    [EngagementCumulativeStatus.CLOSED]: `Was active from ${startDate} to ${endDate}`,
    [EngagementCumulativeStatus.REJECTED_TRIAL]: `Rejected trial from ${startDate} to ${rejectDate}`,
    [EngagementCumulativeStatus.ON_BREAK]: `On break since ${activeBreakStartDate} till ${activeBreakEndDate}`,
    [EngagementCumulativeStatus.INTERVIEW_PENDING]: 'Not scheduled',
    [EngagementCumulativeStatus.INTERVIEW_INTERNAL]: `Internal Interview scheduled on ${internalInterviewDate}`,
    [EngagementCumulativeStatus.INTERVIEW_SCHEDULED]: `Interview time proposed on ${scheduledAtTimes}`,
    [EngagementCumulativeStatus.INTERVIEW_TIME_REJECTED]: `Interview time rejected by ${talentType?.toLocaleLowerCase()}`,
    [EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED]: `Interview scheduled ${interviewNumber}for ${interviewDate} at ${interviewTime} (confirmed by ${confirmedBy})`,
    [EngagementCumulativeStatus.INTERVIEW_MISSED]: 'Interview missed',
    [EngagementCumulativeStatus.INTERVIEW_ACCEPTED]: `${talentType} accepted (start date not set yet)`,
    [EngagementCumulativeStatus.INTERVIEW_REJECTED]:
      'Rejected during interview',
    [EngagementCumulativeStatus.INTERVIEW_EXPIRED]: 'Interview expired',
    [EngagementCumulativeStatus.INTERVIEW_OCCURRED]: `Interview occurred on ${interviewDate} at ${interviewTime} (verified by ${verifiedBy})`,
    [EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF]: `Interview occurred on ${interviewDate} at ${interviewTime} (verified by ${verifiedBy})`,
    [EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED]: `Interview didn't occur on ${interviewDate} at ${interviewTime} (verified by ${verifiedBy})`
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return map[engagement.cumulativeStatus as EngagementCumulativeStatus]
}

export default getEngagementDetailedStatus

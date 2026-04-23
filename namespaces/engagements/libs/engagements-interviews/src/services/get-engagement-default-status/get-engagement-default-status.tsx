import { getRoleTypeText } from '@staff-portal/facilities'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

const NOT_SET_VALUE = 'not set'

type EngagementStatusMap = { [K in EngagementCumulativeStatus]: string }

export const getDefaultEngagementStatusMap = (
  talentType: string
): EngagementStatusMap => ({
  [EngagementCumulativeStatus.DRAFT]: 'Draft',
  [EngagementCumulativeStatus.READY_TO_SEND]: 'Confirmed',
  [EngagementCumulativeStatus.PENDING]: 'Pending review',
  [EngagementCumulativeStatus.PENDING_LEGAL]: 'Pending legal',
  [EngagementCumulativeStatus.PENDING_APPROVAL]: 'Pending CP Approval',
  [EngagementCumulativeStatus.REJECTED_DRAFT]: 'Rejected',
  [EngagementCumulativeStatus.UNSAVED_DRAFT]: 'Unsaved Draft',
  [EngagementCumulativeStatus.CANCELLED_DRAFT]: 'Cancelled Draft',
  [EngagementCumulativeStatus.SCHEDULED]: 'Start date scheduled',
  [EngagementCumulativeStatus.ON_TRIAL]: 'On trial',
  [EngagementCumulativeStatus.ON_HOLD]: 'On hold',
  [EngagementCumulativeStatus.ACTIVE]: 'Active',
  [EngagementCumulativeStatus.REJECTED_INTERVIEW]: 'Rejected during interview',
  [EngagementCumulativeStatus.CLOSED]: 'Closed',
  [EngagementCumulativeStatus.EXPIRED]: 'Expired',
  [EngagementCumulativeStatus.ON_BREAK]: 'On break',
  [EngagementCumulativeStatus.CANCELLED]: 'Cancelled',
  [EngagementCumulativeStatus.PENDING_EXPIRATION]: 'Pending expiration',
  [EngagementCumulativeStatus.END_SCHEDULED]: 'End scheduled',
  [EngagementCumulativeStatus.REJECTED_TRIAL]: 'Trial rejected',
  [EngagementCumulativeStatus.INTERVIEW_INTERNAL]: 'Internal Interview',
  [EngagementCumulativeStatus.INTERVIEW_PENDING]: 'Not scheduled',
  [EngagementCumulativeStatus.INTERVIEW_SCHEDULED]: 'Waiting for confirmation',
  [EngagementCumulativeStatus.INTERVIEW_TIME_REJECTED]:
    'Interview time rejected',
  [EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED]:
    'Interview time confirmed',
  [EngagementCumulativeStatus.INTERVIEW_MISSED]: 'Missed',
  [EngagementCumulativeStatus.INTERVIEW_ACCEPTED]: `${talentType} accepted`,
  [EngagementCumulativeStatus.INTERVIEW_REJECTED]: `${talentType} rejected`,
  [EngagementCumulativeStatus.INTERVIEW_EXPIRED]: 'Expired',
  [EngagementCumulativeStatus.EXPIRATION_POSTPONED]: 'Expiration postponed',
  [EngagementCumulativeStatus.INTERVIEW_OCCURRED]: 'Interview occurred',
  [EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF]:
    'Interview occurred',
  [EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED]: 'Interview not occurred',
  [EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED_VERIFIED_BY_STAFF]:
    'Interview not occurred'
})

export const getEngagementDefaultStatus = (
  cumulativeStatus?: string | null,
  talentType?: string
) => {
  if (!cumulativeStatus) {
    return NOT_SET_VALUE
  }

  const statusesMap = getDefaultEngagementStatusMap(getRoleTypeText(talentType))

  return statusesMap[cumulativeStatus as EngagementCumulativeStatus]
}

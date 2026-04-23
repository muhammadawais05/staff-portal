import { SubmissionErrors } from '@toptal/picasso-forms'
import {
  Engagement,
  Interview,
  Meeting,
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewPreferredDurations,
  InterviewType,
  Scalars,
  Maybe
} from '@staff-portal/graphql/staff'
import { FormErrors } from '@staff-portal/mutation-result-handlers'
import { TimeZoneFragment } from '@staff-portal/date-time-utils'

export type EngagementWithStatusAndTimeZone =
  Pick<Engagement, 'status' | 'cumulativeStatus'> &
    { timeZone?: TimeZoneFragment } &
    { interview?: Pick<Interview, 'cumulativeStatus'> | null }

export type EngagementDetailedStatusData = Pick<
  Engagement,
  | 'status'
  | 'cumulativeStatus'
  | 'restoredAt'
  | 'createdAt'
  | 'startDate'
  | 'rejectDate'
  | 'endDate'
  | 'trialLength'
  | 'trialEndDate'
  | 'onHoldStartDate'
  > &
{ timeZone?: Maybe<TimeZoneFragment> } &
{
  interview?:
    | (Pick<
        Interview,
        | 'cumulativeStatus'
        | 'scheduledAtTimes'
        | 'interviewTime'
        | 'verifierName'
      > & {
        meeting?: Pick<Meeting, 'attendeeName' | 'topSchedulerMeeting'> | null
      })
    | null
} & {
  internalInterview?: Pick<Interview, 'interviewTime'> | null
} & {
  currentEngagementBreak?: { startDate: string; endDate?: string | null } | null
} & {
  talent?: { id: string; type: string } | null
} & {
  interviews?: { totalCount: number } | null
}

export type ContactType = {
  id: string
  fullName: string
}

export type TimeSlotType = {
  date: string
  hours: string[]
}

export type ProposedTimeSlot = {
  date?: Scalars['Date']
  time: string
}

export type ScheduleInterviewCommonFormValues = {
  acceptForTalent: boolean
  comment?: string
  timeZoneName: string
  initiator?: InterviewInitiator
  interviewType?: InterviewType | null
  interviewContacts: string[]
  communication?: InterviewCommunicationType
  preferredDuration?: InterviewPreferredDurations
  date?: Scalars['Date']
  time?: string
  scheduledAtTimes: ProposedTimeSlot[]
  gcDescription: string
  primaryContactId?: string
}

export type ScheduleInterviewFormValues = ScheduleInterviewCommonFormValues & {
  sendGoogleCalendarInvitation?: boolean
  disableCompanyNotifications?: boolean
  gcSummary: string
  gcUserReceivers: string[]
  gcEmails?: string
}

export type ScheduleInternalInterviewFormValues =
  ScheduleInterviewCommonFormValues

export type ScheduleInterviewSubmitType =
  | Promise<void | SubmissionErrors | FormErrors>
  | undefined

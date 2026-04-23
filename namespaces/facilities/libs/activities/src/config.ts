import {
  ActivityOutcome,
  ActivityType,
  ClientRelatedActivitySubtype,
  InternalActivitySubtype,
  JobRelatedActivitySubtype,
  OtherActivitySubtype,
  TalentRelatedActivitySubtype
} from '@staff-portal/graphql/staff'

import { ActivityContentField } from './enums'

export const ACTIVITY_TYPE_TEXT_MAPPING: Record<ActivityType, string> = {
  [ActivityType.CLIENT_RELATED]: 'Client-related',
  [ActivityType.TALENT_RELATED]: 'Talent-related',
  [ActivityType.JOB_RELATED]: 'Job-related',
  [ActivityType.INTERNAL]: 'Internal',
  [ActivityType.OTHER]: 'Other'
}

export const CLIENT_RELATED_SUBTYPE_TEXT_MAPPING: Record<
  ClientRelatedActivitySubtype,
  string
> = {
  [ClientRelatedActivitySubtype.PRE_SALES_CALL]: 'Pre-sales call',
  [ClientRelatedActivitySubtype.MATCHING_CALL]: 'Matching call',
  [ClientRelatedActivitySubtype.CLIENT_FOLLOW_UP]: 'Client follow-up',
  [ClientRelatedActivitySubtype.TALENT_TEAM_CALL]: 'Talent team call',
  [ClientRelatedActivitySubtype.CROSS_SELL]: 'Cross sell',
  [ClientRelatedActivitySubtype.OTHER]: 'Other'
}

export const TALENT_RELATED_SUBTYPE_TEXT_MAPPING: Record<
  TalentRelatedActivitySubtype,
  string
> = {
  [TalentRelatedActivitySubtype.REACHOUT]: 'Reachout',
  [TalentRelatedActivitySubtype.FEEDBACK_CALL]: 'Feedback call',
  [TalentRelatedActivitySubtype.SUPPORT]: 'Support',
  [TalentRelatedActivitySubtype.DISBANDMENT]: 'Disbandment',
  [TalentRelatedActivitySubtype.AVAILABILITY_CHANGE]: 'Availability change',
  [TalentRelatedActivitySubtype.RATE_CHANGE]: 'Rate change',
  [TalentRelatedActivitySubtype.OTHER]: 'Other'
}

export const JOB_RELATED_SUBTYPE_TEXT_MAPPING: Record<
  JobRelatedActivitySubtype,
  string
> = {
  [JobRelatedActivitySubtype.CLIENT_CHECK_IN]: 'Client check-in',
  [JobRelatedActivitySubtype.TALENT_CHECK_IN]: 'Talent check-in',
  [JobRelatedActivitySubtype.MATCHING_CALL]: 'Matching call',
  [JobRelatedActivitySubtype.TALENT_VETTING]: 'Talent vetting',
  [JobRelatedActivitySubtype.TALENT_INTERVIEW]: 'Talent interview',
  [JobRelatedActivitySubtype.DISPUTE_OR_INVESTIGATION]: 'Dispute/investigation',
  [JobRelatedActivitySubtype.TIMESHEET]: 'Timesheet',
  [JobRelatedActivitySubtype.OTHER]: 'Other'
}

export const INTERNAL_SUBTYPE_TEXT_MAPPING: Record<
  InternalActivitySubtype,
  string
> = {
  [InternalActivitySubtype.SALES_SUPPORT]: 'Sales support',
  [InternalActivitySubtype.INTERNAL_MEETING]: 'Internal meeting',
  [InternalActivitySubtype.TEAM_MEETING]: 'Team meeting',
  [InternalActivitySubtype.COORDINATION]: 'Coordination',
  [InternalActivitySubtype.INITIATIVE]: 'Initiative',
  [InternalActivitySubtype.EXPERIMENT]: 'Experiment',
  [InternalActivitySubtype.BILLING_LEGAL_SYNC]: 'Billing/Legal sync',
  [InternalActivitySubtype.SOURCING_SYNC]: 'Sourcing sync',
  [InternalActivitySubtype.SALES_SYNC]: 'Sales sync',
  [InternalActivitySubtype.OTHER]: 'Other'
}

export const OTHER_SUBTYPE_TEXT_MAPPING: Record<OtherActivitySubtype, string> =
  {
    [OtherActivitySubtype.INTERNAL_SYNC]: 'Internal Sync',
    [OtherActivitySubtype.OTHER]: 'Other'
  }

export type ActivitySubtype =
  | ClientRelatedActivitySubtype
  | TalentRelatedActivitySubtype
  | JobRelatedActivitySubtype
  | InternalActivitySubtype
  | OtherActivitySubtype

export const ACTIVITY_SUBTYPE_TEXT_MAPPING: Record<ActivitySubtype, string> = {
  ...CLIENT_RELATED_SUBTYPE_TEXT_MAPPING,
  ...TALENT_RELATED_SUBTYPE_TEXT_MAPPING,
  ...JOB_RELATED_SUBTYPE_TEXT_MAPPING,
  ...INTERNAL_SUBTYPE_TEXT_MAPPING,
  ...OTHER_SUBTYPE_TEXT_MAPPING
}

export const ACTIVITY_OUTCOME_TEXT_MAPPING: Record<ActivityOutcome, string> = {
  [ActivityOutcome.COMPLETED]: 'Completed',
  [ActivityOutcome.CANCELLED]: 'Cancelled',
  [ActivityOutcome.RESCHEDULED]: 'Rescheduled',
  [ActivityOutcome.OTHER]: 'Other'
}

export const ACTIVITY_CONFIGURATION = [
  ActivityContentField.ACTIVITY_TYPE,
  ActivityContentField.ACTIVITY_SUB_TYPE,
  ActivityContentField.ACTIVITY_DATE,
  ActivityContentField.DURATION,
  ActivityContentField.CONTACT,
  ActivityContentField.OUTCOME
]
export const CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID =
  'CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID'

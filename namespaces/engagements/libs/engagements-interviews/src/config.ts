import { EngagementStatus } from '@staff-portal/graphql/staff'

export const INTERVIEW_CONTACTS_FIELD_NAME = 'interviewContacts'
export const INTERVIEW_COMMUNICATION_FIELD_NAME = 'communication'
export const INTERVIEW_INITIATOR_FIELD_NAME = 'initiator'
export const COMMENT_FIELD_NAME = 'comment'
export const PRIMARY_CONTACT_ID_FIELD_NAME = 'primaryContactId'

export const ENGAGEMENT_STATUSES_WITH_TIMEZONE_TOOLTIP = [
  EngagementStatus.ACTIVE,
  EngagementStatus.CLOSED,
  EngagementStatus.END_SCHEDULED,
  EngagementStatus.ON_BREAK,
  EngagementStatus.ON_HOLD,
  EngagementStatus.ON_TRIAL,
  EngagementStatus.PENDING_LEGAL,
  EngagementStatus.REJECTED_TRIAL,
  EngagementStatus.SCHEDULED
]

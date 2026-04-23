import { EngagementStatus } from '@staff-portal/graphql/staff'

export const getStatusMessageMapping = ({
  talentType
}: {
  talentType: string
}): Record<EngagementStatus, string> => ({
  [EngagementStatus.DRAFT]: 'Draft',
  [EngagementStatus.READY_TO_SEND]: 'Confirmed',
  [EngagementStatus.CANCELLED]: 'Interview was cancelled',
  [EngagementStatus.CANCELLED_DRAFT]: 'Draft Cancelled',
  [EngagementStatus.PENDING]:
    'Company reviews candidate and decides to proceed or reject him.',
  [EngagementStatus.PENDING_APPROVAL]: 'Pending Approval',
  [EngagementStatus.REJECTED_DRAFT]: 'Rejected',
  [EngagementStatus.PENDING_LEGAL]:
    'A signed and verified TOP contract is required to proceed.',
  [EngagementStatus.REJECTED_INTERVIEW]: `Company rejected ${talentType}.`,
  [EngagementStatus.REJECTED_TRIAL]: `Company rejected ${talentType} during trial period.`,
  [EngagementStatus.EXPIRATION_POSTPONED]: 'Engagement expiration postponed.',
  [EngagementStatus.EXPIRED]:
    "Company didn't take an action within defined time frames and engagement was canceled.",
  [EngagementStatus.CLOSED]: 'Engagement was closed.',
  [EngagementStatus.PENDING_EXPIRATION]:
    "Company didn't take an action within defined time frames and engagement is going to be expired.",
  [EngagementStatus.ON_HOLD]:
    'Trial period has ended without decision, and job is on hold.',
  [EngagementStatus.SCHEDULED]:
    'Company accepted candidate and scheduled start date.',
  [EngagementStatus.ON_TRIAL]: 'Engagement is on trial.',
  [EngagementStatus.ON_BREAK]: 'Engagement is on break.',
  [EngagementStatus.ACTIVE]: 'Engagement is active.',
  [EngagementStatus.END_SCHEDULED]:
    'Engagement is active, but is scheduled to end.',
  [EngagementStatus.REVIEWED]: ''
})

import { defineMessage } from '@toptal/staff-portal-message-bus'

export const INTERVIEW_UPDATED =
  defineMessage<{ interviewId: string; engagementId: string }>()
export const INTERVIEW_SCHEDULED = defineMessage<{ engagementId: string }>()

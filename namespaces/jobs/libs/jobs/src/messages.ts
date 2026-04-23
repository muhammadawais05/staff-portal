import { defineMessage } from '@toptal/staff-portal-message-bus'

export const JOB_FAVORITE_TALENTS_UPDATED = defineMessage<{ jobId: string }>()
export const JOB_FAVORITE_TALENTS_CLEARED = defineMessage<{ jobId: string }>()
export const JOB_AVAILABILITY_REQUEST_UPDATED = defineMessage<{
  availabilityRequestId: string
}>()
export const JOB_UPDATED = defineMessage<{ jobId: string }>()
export const JOB_MATCHERS_QUESTIONS_UPDATED = defineMessage<{ jobId: string }>()
export const JOB_CLONED = defineMessage<{ jobId: string }>()

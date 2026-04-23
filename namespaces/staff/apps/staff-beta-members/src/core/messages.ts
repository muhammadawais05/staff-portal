import { defineMessage } from '@toptal/staff-portal-message-bus'

export const STAFF_BETA_STATUS_UPDATED = defineMessage<{
  staffIds: string[]
}>()

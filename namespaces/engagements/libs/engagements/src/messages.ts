import { defineMessage } from '@toptal/staff-portal-message-bus'

export const ENGAGEMENT_UPDATED = defineMessage<{ engagementId: string }>()
export const ENGAGEMENT_BILLING_CYCLES_UPDATE = defineMessage(
  'billing-cycles:update'
)
export const ENGAGEMENT_TALENT_UPDATED = defineMessage<{
  engagementId: string
}>()

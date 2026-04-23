import { defineMessage } from '@toptal/staff-portal-message-bus'

export const OPPORTUNITY_CONTRACT_DELETED =
  defineMessage<{ opportunityId: string }>()

export const OPPORTUNITY_STAFF_UPDATE =
  defineMessage<{ opportunityId: string }>()

import { defineMessage } from '@toptal/staff-portal-message-bus'

export const OFAC_UPDATED = defineMessage<{ nodeId: string }>()

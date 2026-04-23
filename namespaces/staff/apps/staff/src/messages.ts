import { defineMessage } from '@toptal/staff-portal-message-bus'

export const STAFF_UPDATED = defineMessage<{ staffId: string }>()
export const TEAMS_LIST_UPDATED = defineMessage()

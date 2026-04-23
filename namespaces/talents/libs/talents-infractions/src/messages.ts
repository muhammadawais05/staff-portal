import { defineMessage } from '@toptal/staff-portal-message-bus'

export const TALENT_INFRACTION_CREATED = defineMessage<{ talentId: string }>()

import { defineMessage } from '@toptal/staff-portal-message-bus'

export const REFRESH_COMMUNITY_LEADER_LIST = defineMessage()
export const REFRESH_COMMUNITY_LEADER_PROFILE =
  defineMessage<{ talentId: string }>()

import { defineMessage } from '@toptal/staff-portal-message-bus'

export const CLIENT_UPDATED = defineMessage<{ companyId: string }>()
export const INTERNAL_TEAM_UPDATE = defineMessage<{ clientId: string }>()
export const CONTRACTS_UPDATED = defineMessage<{ clientId: string }>()
export const UPDATE_INVESTIGATION = defineMessage<{ companyId: string }>()
export const REFRESH_INVESTIGATIONS = defineMessage<{
  companyId: string
}>()
export const REFRESH_SYSTEM_INFORMATION = defineMessage<{
  companyId: string
}>()
export const TOPSCREEN_FEATURE_ENABLED = defineMessage<{ clientId: string }>()

export const TOPSCREEN_POSITION_CREATED =
  defineMessage<{ topscreenClientId: string }>()

export const TOPSCREEN_POSITION_UPDATED =
  defineMessage<{ positionId: string }>()

export const OPPORTUNITY_UNLINKED =
  defineMessage<{ representativeId: string; opportunityId?: string | null }>()

export const OPPORTUNITY_LINKED = defineMessage<{ representativeId: string }>()

import { defineMessage } from '@toptal/staff-portal-message-bus'

import { TabsCountersScope } from './types'

export const TABS_COUNTERS_UPDATED =
  defineMessage<{ scope: TabsCountersScope }>()
export const TALENT_UPDATED = defineMessage<{ talentId: string }>()
export const ROLE_UPDATED = defineMessage<{ roleId: string }>()
export const ROLE_STEP_UPDATED = defineMessage()

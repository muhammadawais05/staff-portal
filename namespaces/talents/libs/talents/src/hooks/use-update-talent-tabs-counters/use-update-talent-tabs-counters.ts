import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { TABS_COUNTERS_UPDATED } from '../../messages'
import { TabsCountersScope } from '../../types'

const useUpdateTalentTabsCounters = () => {
  const emitMessage = useMessageEmitter()

  return () => {
    emitMessage(TABS_COUNTERS_UPDATED, {
      scope: TabsCountersScope.TalentProfile
    })
  }
}

export default useUpdateTalentTabsCounters

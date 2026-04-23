import { renderHook } from '@testing-library/react-hooks'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { TABS_COUNTERS_UPDATED } from '../../messages'
import { TabsCountersScope } from '../../types'
import useUpdateTalentTabsCounters from './use-update-talent-tabs-counters'

jest.mock('@toptal/staff-portal-message-bus')

const useMessageEmitterMock = useMessageEmitter as jest.Mock
const emitMessageMock = jest.fn()

describe('useUpdateTalentTabsCounters', () => {
  beforeEach(() => {
    useMessageEmitterMock.mockImplementation(() => emitMessageMock)
  })

  it('calls `emitMessage` with `TABS_COUNTERS_UPDATED` event type and scope `talent`', () => {
    const { result } = renderHook(() => useUpdateTalentTabsCounters())

    expect(emitMessageMock).toHaveBeenCalledTimes(0)

    result.current()

    expect(emitMessageMock).toHaveBeenCalledTimes(1)
    expect(emitMessageMock).toHaveBeenCalledWith(TABS_COUNTERS_UPDATED, {
      scope: TabsCountersScope.TalentProfile
    })
  })
})

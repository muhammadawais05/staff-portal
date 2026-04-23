import { renderHook } from '@testing-library/react-hooks'
import LogRocket from 'logrocket'

import useLogRocket from '../use-log-rocket'

jest.mock('logrocket')

type RenderHookProps = {
  currentUser: Parameters<typeof useLogRocket>[0]
  LOG_ROCKET_IS_ENABLED: boolean
}

describe('useLogRocket', () => {
  beforeEach(() => {
    LogRocket.identify = jest.fn()
    LogRocket.getSessionURL = jest.fn(fn => fn('test-session'))

    window.analytics = {
      track: jest.fn(),
      page: jest.fn(),
      identify: jest.fn()
    } as any // eslint-disable-line @typescript-eslint/no-explicit-any
  })

  it('calls LogRocket.identify and integrates with Segment when enabled', () => {
    const initialProps: RenderHookProps = {
      currentUser: undefined,
      LOG_ROCKET_IS_ENABLED: false
    }

    const { rerender } = renderHook(
      ({ currentUser, LOG_ROCKET_IS_ENABLED }) =>
        useLogRocket(currentUser, LOG_ROCKET_IS_ENABLED),
      { initialProps }
    )

    expect(LogRocket.identify).not.toHaveBeenCalled()
    expect(LogRocket.getSessionURL).not.toHaveBeenCalled()
    expect(window.analytics.track).not.toHaveBeenCalled()

    rerender({
      currentUser: {
        id: 'user-id',
        email: 'test@email.com',
        fullName: 'Test User',
        type: 'Staff',
        chameleonParticipantUuid: 'test-chameleon-uuid'
      },
      LOG_ROCKET_IS_ENABLED: true
    })

    expect(LogRocket.identify).toHaveBeenCalledWith('user-id', {
      fullName: 'Test User',
      email: 'test@email.com',
      role: 'Staff',
      chameleonUuid: 'test-chameleon-uuid'
    })

    expect(LogRocket.getSessionURL).toHaveBeenCalledTimes(1)

    expect(window.analytics.track).toHaveBeenCalledWith('LogRocket', {
      sessionURL: 'test-session'
    })
  })
})

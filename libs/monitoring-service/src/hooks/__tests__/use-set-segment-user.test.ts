import { renderHook } from '@testing-library/react-hooks'

import useSetSegmentUser from '../use-set-segment-user'

type RenderHookProps = {
  role: Parameters<typeof useSetSegmentUser>[0]
  USER_TRACKING_IS_ENABLED: boolean
}

describe('useSetSegmentUser', () => {
  beforeEach(() => {
    window.analytics = {
      track: jest.fn(),
      page: jest.fn(),
      identify: jest.fn()
    } as any // eslint-disable-line @typescript-eslint/no-explicit-any
  })

  it('calls analytics.identify with proper dimension setting when enabled', () => {
    const initialProps: RenderHookProps = {
      role: undefined,
      USER_TRACKING_IS_ENABLED: false
    }

    const { rerender } = renderHook(
      ({ role, USER_TRACKING_IS_ENABLED }) =>
        useSetSegmentUser(role, USER_TRACKING_IS_ENABLED),
      { initialProps }
    )

    expect(window.analytics.identify).not.toHaveBeenCalled()

    rerender({
      role: {
        decodedId: '100010',
        type: 'Staff'
      },
      USER_TRACKING_IS_ENABLED: true
    })

    expect(window.analytics.identify).toHaveBeenCalledWith({
      dimension11: 'Staff-100010'
    })
  })
})

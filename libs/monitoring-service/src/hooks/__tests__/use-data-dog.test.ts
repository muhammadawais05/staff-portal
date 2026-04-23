import { renderHook } from '@testing-library/react-hooks'
import { datadogRum } from '@datadog/browser-rum'

import useDataDog from '../use-data-dog'

jest.mock('@datadog/browser-rum')

describe('useDataDog', () => {
  beforeEach(() => {
    datadogRum.setUser = jest.fn()
    datadogRum.removeUser = jest.fn()
  })

  describe('when disabled', () => {
    it('does not call datadogRum.setUser', () => {
      renderHook(() => useDataDog(undefined, false))

      expect(datadogRum.setUser).not.toHaveBeenCalled()
    })

    it('does not call datadogRum.removeUser', () => {
      const { unmount } = renderHook(() => useDataDog(undefined, false))

      unmount()

      expect(datadogRum.removeUser).not.toHaveBeenCalled()
    })
  })

  describe('when enabled', () => {
    it('calls datadogRum.setUser', () => {
      renderHook(() =>
        useDataDog(
          { id: 'user-id', email: 'test@email.com', fullName: 'Test User' },
          true
        )
      )

      expect(datadogRum.setUser).toHaveBeenCalledWith({
        id: 'user-id',
        name: 'Test User',
        email: 'test@email.com'
      })
    })

    it('calls datadogRum.removeUser when unmounted', () => {
      const { unmount } = renderHook(() =>
        useDataDog(
          { id: 'user-id', email: 'test@email.com', fullName: 'Test User' },
          true
        )
      )

      unmount()

      expect(datadogRum.removeUser).toHaveBeenCalled()
    })
  })
})

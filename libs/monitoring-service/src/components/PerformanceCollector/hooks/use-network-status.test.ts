/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from '@testing-library/react-hooks'

import { useNetworkStatus } from './use-network-status'

describe('useNetworkStatus', () => {
  const map: any = {}

  const ectStatusListeners = {
    addEventListener: jest.fn().mockImplementation((event, callback) => {
      map[event] = callback
    }),
    removeEventListener: jest.fn()
  }

  afterEach(() => {
    Object.values(ectStatusListeners).forEach(listener => listener.mockClear())
  })

  /**
   * Tests that addEventListener or removeEventListener was called during the
   * lifecycle of the useEffect hook within useNetworkStatus
   */
  const testEctStatusEventListenerMethod = (method: any) => {
    expect(method).toHaveBeenCalledTimes(1)
    expect(method.mock.calls[0][0]).toBe('change')
    expect(method.mock.calls[0][1].constructor).toEqual(Function)
  }

  it(`should return "true" for unsupported case`, () => {
    const { result } = renderHook(() => useNetworkStatus())

    expect(result.current.unsupported).toBe(true)
  })

  it('should return initialEffectiveConnectionType for unsupported case', () => {
    const initialEffectiveConnectionType = '4g'

    const { result } = renderHook(() =>
      useNetworkStatus(initialEffectiveConnectionType)
    )

    expect(result.current.unsupported).toBe(true)
    expect(result.current.effectiveConnectionType).toBe(
      initialEffectiveConnectionType
    )
  })

  it('should return 4g of effectiveConnectionType', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.connection = {
      ...ectStatusListeners,
      effectiveType: '4g'
    }

    const { result } = renderHook(() => useNetworkStatus())

    testEctStatusEventListenerMethod(ectStatusListeners.addEventListener)

    expect(result.current.unsupported).toBe(false)
    expect(result.current.effectiveConnectionType).toBe('4g')
  })

  it('should not return initialEffectiveConnectionType for supported case', () => {
    const initialEffectiveConnectionType = '2g'

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.connection = {
      ...ectStatusListeners,
      effectiveType: '4g'
    }

    const { result } = renderHook(() =>
      useNetworkStatus(initialEffectiveConnectionType)
    )

    testEctStatusEventListenerMethod(ectStatusListeners.addEventListener)

    expect(result.current.unsupported).toBe(false)
    expect(result.current.effectiveConnectionType).toBe('4g')
  })

  it('should update the effectiveConnectionType state', () => {
    const { result } = renderHook(() => useNetworkStatus())

    act(() =>
      result.current.setNetworkStatus({
        unsupported: false,
        effectiveConnectionType: '2g'
      })
    )

    expect(result.current.effectiveConnectionType).toBe('2g')
  })

  it('should update the effectiveConnectionType state when navigator.connection change event', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.connection = {
      ...ectStatusListeners,
      effectiveType: '2g'
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.connection.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })

    const { result } = renderHook(() => useNetworkStatus())

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.connection.effectiveType = '4g'
    act(() => {
      map.change()
    })

    expect(result.current.effectiveConnectionType).toBe('4g')
  })
})

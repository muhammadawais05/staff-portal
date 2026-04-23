import { renderHook } from '@testing-library/react-hooks'

// prettier-ignore
afterEach(function() { // eslint-disable-line jest/require-top-level-describe
  jest.resetModules()
})

describe('useHardwareConcurrency', () => {
  const navigator = window.navigator

  afterEach(() => {
    if (!window.navigator) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.navigator = navigator
    }
  })

  it(`should return "true" for unsupported case`, () => {
    Object.defineProperty(window, 'navigator', {
      value: undefined,
      configurable: true,
      writable: true
    })

    const { useHardwareConcurrency } = require('./use-hardware-concurrency')
    const { result } = renderHook(() => useHardwareConcurrency())

    expect(result.current.unsupported).toBe(true)
  })

  it(`should return window.navigator.hardwareConcurrency`, () => {
    const { useHardwareConcurrency } = require('./use-hardware-concurrency')
    const { result } = renderHook(() => useHardwareConcurrency())

    expect(result.current.numberOfLogicalProcessors).toBe(
      window.navigator.hardwareConcurrency
    )
    expect(result.current.unsupported).toBe(false)
  })

  it('should return 4 for device of hardwareConcurrency = 4', () => {
    Object.defineProperty(window.navigator, 'hardwareConcurrency', {
      value: 4,
      configurable: true,
      writable: true
    })
    const { useHardwareConcurrency } = require('./use-hardware-concurrency')
    const { result } = renderHook(() => useHardwareConcurrency())

    expect(result.current.numberOfLogicalProcessors).toBe(4)
    expect(result.current.unsupported).toBe(false)
  })

  it('should return 2 for device of hardwareConcurrency = 2', () => {
    Object.defineProperty(window.navigator, 'hardwareConcurrency', {
      value: 2,
      configurable: true,
      writable: true
    })
    const { useHardwareConcurrency } = require('./use-hardware-concurrency')
    const { result } = renderHook(() => useHardwareConcurrency())

    expect(result.current.numberOfLogicalProcessors).toBe(2)
    expect(result.current.unsupported).toBe(false)
  })
})

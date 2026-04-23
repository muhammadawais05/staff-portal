import { renderHook } from '@testing-library/react-hooks'

import { MemoryStatus } from './use-memory-status'

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => jest.resetModules())

const getMemoryStatus = (currentResult: MemoryStatus) => ({
  unsupported: false,
  deviceMemory: currentResult.deviceMemory,
  totalJSHeapSize: currentResult.totalJSHeapSize,
  usedJSHeapSize: currentResult.usedJSHeapSize,
  jsHeapSizeLimit: currentResult.jsHeapSizeLimit
})

describe('useMemoryStatus', () => {
  it(`should return "true" for unsupported case`, () => {
    const { useMemoryStatus } = require('./use-memory-status')
    const { result } = renderHook(() => useMemoryStatus())

    expect(result.current.unsupported).toBe(true)
  })

  it('should return initialMemoryStatus for unsupported case', () => {
    const mockInitialMemoryStatus = {
      deviceMemory: 4
    }
    const { deviceMemory } = mockInitialMemoryStatus

    const { useMemoryStatus } = require('./use-memory-status')
    const { result } = renderHook(() =>
      useMemoryStatus(mockInitialMemoryStatus)
    )

    expect(result.current.unsupported).toBe(true)
    expect(result.current.deviceMemory).toEqual(deviceMemory)
  })

  it('should return mockMemory status', () => {
    const mockMemoryStatus = {
      deviceMemory: 4,
      totalJSHeapSize: 60,
      usedJSHeapSize: 40,
      jsHeapSizeLimit: 50
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.deviceMemory = mockMemoryStatus.deviceMemory

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.window.performance.memory = {
      totalJSHeapSize: mockMemoryStatus.totalJSHeapSize,
      usedJSHeapSize: mockMemoryStatus.usedJSHeapSize,
      jsHeapSizeLimit: mockMemoryStatus.jsHeapSizeLimit
    }

    const { useMemoryStatus } = require('./use-memory-status')
    const { result } = renderHook(() => useMemoryStatus())

    expect(getMemoryStatus(result.current)).toEqual({
      ...mockMemoryStatus,
      unsupported: false
    })
  })

  it('should return mockMemory status without performance memory data', () => {
    const mockMemoryStatus = {
      deviceMemory: 4
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.deviceMemory = mockMemoryStatus.deviceMemory
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.window.performance.memory

    const { useMemoryStatus } = require('./use-memory-status')
    const { result } = renderHook(() => useMemoryStatus())

    expect(result.current.deviceMemory).toEqual(mockMemoryStatus.deviceMemory)
    expect(result.current.unsupported).toBe(false)
  })

  it('should not return initialMemoryStatus for supported case', () => {
    const mockMemoryStatus = {
      deviceMemory: 4,
      totalJSHeapSize: 60,
      usedJSHeapSize: 40,
      jsHeapSizeLimit: 50
    }
    const mockInitialMemoryStatus = {
      deviceMemory: 4
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.deviceMemory = mockMemoryStatus.deviceMemory

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.window.performance.memory = {
      totalJSHeapSize: mockMemoryStatus.totalJSHeapSize,
      usedJSHeapSize: mockMemoryStatus.usedJSHeapSize,
      jsHeapSizeLimit: mockMemoryStatus.jsHeapSizeLimit
    }

    const { useMemoryStatus } = require('./use-memory-status')
    const { result } = renderHook(() =>
      useMemoryStatus(mockInitialMemoryStatus)
    )

    expect(getMemoryStatus(result.current)).toEqual({
      ...mockMemoryStatus,
      unsupported: false
    })
  })
})

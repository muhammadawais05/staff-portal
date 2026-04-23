import { act, renderHook } from '@testing-library/react-hooks'

import { DocumentNode, NetworkStatus } from '../..'
import { useLazyQuery } from '../use-lazy-query'
import { useFieldPollingUpdate } from './use-field-polling-update'

jest.mock('../use-lazy-query')

const useLazyQueryMock = useLazyQuery as jest.Mock

describe('useFieldPollingUpdate', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('calls useLazyQuery with correct params passed', () => {
    useLazyQueryMock.mockReturnValue([() => { }, {}])

    renderHook(() =>
      useFieldPollingUpdate('query' as unknown as DocumentNode, {
        variables: 'variables',
        pollInterval: 5
      })
    )

    expect(useLazyQueryMock).toHaveBeenCalledTimes(1)
    expect(useLazyQueryMock).toHaveBeenCalledWith('query', {
      variables: 'variables',
      pollInterval: 5,
      notifyOnNetworkStatusChange: true
    })
  })

  it('returns expected data', () => {
    const stopPollingMock = () => { }

    useLazyQueryMock.mockReturnValue([
      () => { },
      {
        stopPolling: stopPollingMock
      }
    ])

    // Act
    const { result } = renderHook(() =>
      useFieldPollingUpdate('query' as unknown as DocumentNode, {
        variables: 'variables'
      })
    )

    expect(result.current).toEqual({
      startPolling: expect.any(Function),
      stopPolling: stopPollingMock,
      polling: false
    })
  })

  describe("when returned 'startPolling' function called", () => {
    it('initiates request', () => {
      const requestMock = jest.fn()

      useLazyQueryMock.mockReturnValue([requestMock, {}])

      // Act
      const { result } = renderHook(() =>
        useFieldPollingUpdate('query' as unknown as DocumentNode, {
          variables: 'variables',
          pollInterval: 1000
        })
      )

      act(() => {
        result.current.startPolling()
        jest.advanceTimersByTime(1200)
      })

      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(result.current.polling).toBeTruthy()
    })
  })

  describe('when polling', () => {
    it('stops polling after new data received', () => {
      const stopPollingMock = jest.fn()

      useLazyQueryMock.mockReturnValue([
        () => { },
        {
          stopPolling: stopPollingMock,
          previousData: 'previous-data',
          data: 'new-data'
        }
      ])

      // Act
      const { result } = renderHook(() =>
        useFieldPollingUpdate('query' as unknown as DocumentNode, {
          variables: 'variables',
          pollInterval: 1000
        })
      )

      act(() => {
        result.current.startPolling()
      })

      expect(stopPollingMock).toHaveBeenCalledTimes(1)
      expect(result.current.polling).toBeFalsy()
    })

    it('stops polling after reached limit of attempts', () => {
      const stopPollingMock = jest.fn()
      const getLazyQueryReturnValueMock = (status: NetworkStatus) => [
        () => { },
        {
          stopPolling: stopPollingMock,
          previousData: 'data',
          data: 'data',
          networkStatus: status
        }
      ]

        ;[
          NetworkStatus.ready, // for initial render
          NetworkStatus.loading, // request initiated
          NetworkStatus.ready, // request finished
          NetworkStatus.poll, // poll initiated
          NetworkStatus.ready, // poll finished,
          NetworkStatus.ready // for render after polling status changed
        ].forEach(status => {
          useLazyQueryMock.mockReturnValueOnce(
            getLazyQueryReturnValueMock(status)
          )
        })

      // Act
      const { result, rerender } = renderHook(() =>
        useFieldPollingUpdate('query' as unknown as DocumentNode, {
          variables: 'variables',
          maxAttempts: 2,
          pollInterval: 1000
        })
      )

      act(() => {
        result.current.startPolling()
      })

      rerender() // request finished
      rerender() // poll initiated
      rerender() // poll finished

      expect(stopPollingMock).toHaveBeenCalledTimes(1)
      expect(result.current.polling).toBeFalsy()
    })
  })
})

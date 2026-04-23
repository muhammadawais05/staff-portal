import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'

import { useTouchCounter } from './use-touch-counter'
import { CounterName } from './counter-names'

jest.mock('@staff-portal/data-layer-service', () => ({
  useMutation: jest.fn()
}))

const useMutationMock = useMutation as jest.Mock
const touchCounterMock = jest.fn()

describe('use-touch-counter', () => {
  beforeEach(() => {
    useMutationMock.mockReturnValue([touchCounterMock])
  })

  describe('use-touch-counter', () => {
    it('calls `touchCounter` mutation', () => {
      renderHook(() =>
        useTouchCounter({ counterName: CounterName.PendingJobs })
      )

      expect(touchCounterMock).toHaveBeenCalledTimes(1)
      expect(touchCounterMock).toHaveBeenCalledWith({
        variables: { counterName: CounterName.PendingJobs }
      })
    })
  })
})

import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { OnlineTestAttemptsFragment } from '../ClaimOnlineTestStepModal/data/get-online-test-data/get-online-test-data.staff.gql.types'
import OnlineTestAttemptLabel from './OnlineTestAttemptLabel'

const mockOnlineTestAttempt = (
  data?: Partial<OnlineTestAttemptsFragment>
): OnlineTestAttemptsFragment => ({
  id: '1',
  createdAt: '2019-01-28T02:40:27+03:00',
  ...data
})

const arrangeTest = (
  onlineTestAttempt?: Partial<OnlineTestAttemptsFragment>
) => {
  return render(
    <TestWrapper>
      <OnlineTestAttemptLabel
        onlineTestAttempt={mockOnlineTestAttempt(onlineTestAttempt)}
      />
    </TestWrapper>
  )
}

describe('OnlineTestAttemptLabel', () => {
  describe('unknown test', () => {
    it('shows track pending test and relative score', () => {
      const { container } = arrangeTest({ pureScore: 10, maxScore: 15 })

      expect(container.textContent).toBe(
        'Track pending 10/15 test "Unknown test"'
      )
    })

    it('shows track pending test and without relative score', () => {
      const { container } = arrangeTest()

      expect(container.textContent).toBe('Track pending test "Unknown test"')
    })

    it('shows track test with relative score', () => {
      const { container } = arrangeTest({
        pureScore: 10,
        maxScore: 15,
        finishedAt: '2019-01-28T02:40:27+03:00'
      })

      expect(container.textContent).toBe('Track 10/15 test "Unknown test"')
    })

    it('shows track test without relative score', () => {
      const { container } = arrangeTest({
        finishedAt: '2019-01-28T02:40:27+03:00'
      })

      expect(container.textContent).toBe('Track test "Unknown test"')
    })
  })

  describe('known test', () => {
    it('shows track pending test and relative score', () => {
      const { container } = arrangeTest({
        pureScore: 10,
        maxScore: 15,
        test: {
          id: '1',
          name: 'Test name',
          service: 'Service name',
          rejectThreshold: 0,
          acceptThreshold: 0
        }
      })

      expect(container.textContent).toBe('Track pending 10/15 test "Test name"')
    })

    it('shows track pending test and without relative score', () => {
      const { container } = arrangeTest({
        test: {
          id: '1',
          name: 'Test name',
          service: 'Service name',
          rejectThreshold: 0,
          acceptThreshold: 0
        }
      })

      expect(container.textContent).toBe('Track pending test "Test name"')
    })

    it('shows track test with relative score', () => {
      const { container } = arrangeTest({
        pureScore: 10,
        maxScore: 15,
        finishedAt: '2019-01-28T02:40:27+03:00',
        test: {
          id: '1',
          name: 'Test name',
          service: 'Service name',
          rejectThreshold: 0,
          acceptThreshold: 0
        }
      })

      expect(container.textContent).toBe('Track 10/15 test "Test name"')
    })

    it('shows track test without relative score', () => {
      const { container } = arrangeTest({
        finishedAt: '2019-01-28T02:40:27+03:00',
        test: {
          id: '1',
          name: 'Test name',
          service: 'Service name',
          rejectThreshold: 0,
          acceptThreshold: 0
        }
      })

      expect(container.textContent).toBe('Track test "Test name"')
    })
  })
})

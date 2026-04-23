import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { isWithinDateInterval } from '@staff-portal/date-time-utils'

import CurrentBillingCycles from './CurrentBillingCycles'

jest.mock('@staff-portal/date-time-utils', () => ({
  isWithinDateInterval: jest.fn()
}))

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: () => jest.fn(() => '20 Nov 2021')
}))

const isWithinDateIntervalMock = isWithinDateInterval as jest.Mock

const mockReturnValues = (value: boolean) =>
  isWithinDateIntervalMock.mockReturnValueOnce(value)

const arrangeTest = (props: ComponentProps<typeof CurrentBillingCycles>) =>
  render(
    <TestWrapper>
      <CurrentBillingCycles {...props} />
    </TestWrapper>
  )

describe('CurrentBillingCycles', () => {
  describe('renders nothing', () => {
    it('when cycle is not within date interval', () => {
      mockReturnValues(false)
      arrangeTest({
        cycles: [{ startDate: '2021-10-24', endDate: '2021-10-29' }]
      })

      expect(
        screen.queryByTestId('CurrentBillingCycles')
      ).not.toBeInTheDocument()
    })
  })

  describe('renders content', () => {
    it('when cycle is within date interval', () => {
      mockReturnValues(true)
      arrangeTest({
        cycles: [{ startDate: '2021-10-24', endDate: '2021-10-29' }]
      })

      expect(screen.getByText('20 Nov 2021 - 20 Nov 2021')).toBeInTheDocument()
    })
  })
})

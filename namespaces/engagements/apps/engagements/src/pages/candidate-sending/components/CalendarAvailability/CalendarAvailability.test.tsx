import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import CalendarAvailability, { Props } from './CalendarAvailability'
import { getTotalOverlapping } from './utils'

jest.mock(
  '../CalendarAvailabilityTooltipContent/CalendarAvailabilityTooltipContent',
  () => ({
    __esModule: true,
    default: () => <div data-testid='calendar-availability-tooltip-content' />
  })
)

jest.mock('./utils')
const mockGetTotalOverlapping = getTotalOverlapping as jest.Mock

const renderComponent = ({
  talentCalendarAvailability = [{ date: '2022-02-02', slotsCount: 3 }]
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <CalendarAvailability
        talentCalendarAvailability={talentCalendarAvailability}
      />
    </TestWrapper>
  )

describe('CalendarAvailability', () => {
  describe('when hover', () => {
    it('shows the tooltip', async () => {
      mockGetTotalOverlapping.mockReturnValue(1)
      renderComponent()

      fireEvent.mouseOver(screen.getByTestId('calendar-availability'))

      expect(
        await screen.findByTestId('calendar-availability-tooltip-content')
      ).toBeInTheDocument()
    })
  })

  describe('when there is only one overlapping', () => {
    it('shows overlapping time slot', () => {
      mockGetTotalOverlapping.mockReturnValue(1)
      renderComponent()

      expect(
        screen.getByText('1 overlapping timeslot over next 1 day')
      ).toBeInTheDocument()
    })
  })

  describe('when there are multiple overlapping', () => {
    it('shows overlapping time slots', () => {
      mockGetTotalOverlapping.mockReturnValue(2)
      renderComponent()

      expect(
        screen.getByText('2 overlapping timeslots over next 1 day')
      ).toBeInTheDocument()
    })
  })

  describe('when there are multiple dates', () => {
    it('shows overlapping time slots over next days', () => {
      mockGetTotalOverlapping.mockReturnValue(3)
      renderComponent({
        talentCalendarAvailability: [
          { date: '2022-02-02', slotsCount: 1 },
          { date: '2022-02-03', slotsCount: 2 }
        ]
      })

      expect(
        screen.getByText('3 overlapping timeslots over next 2 days')
      ).toBeInTheDocument()
    })
  })
})

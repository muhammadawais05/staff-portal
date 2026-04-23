import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import CalendarAvailabilityTooltipContent, {
  Props
} from './CalendarAvailabilityTooltipContent'

const renderComponent = ({
  talentCalendarAvailability = []
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <CalendarAvailabilityTooltipContent
        talentCalendarAvailability={talentCalendarAvailability}
      />
    </TestWrapper>
  )

describe('CalendarAvailabilityTooltipContent', () => {
  it('shows the availability tooltip content', () => {
    renderComponent({
      talentCalendarAvailability: [
        { date: '2022-02-02', slotsCount: 2 },
        { date: '2022-02-03', slotsCount: 1 },
        { date: '2022-02-04', slotsCount: 0 }
      ]
    })

    expect(
      screen.getByTestId('calendar-availability-tooltip-content-2022-02-02')
    ).toHaveTextContent('Wednesday: 2 overlapping slots')
    expect(
      screen.getByTestId('calendar-availability-tooltip-content-2022-02-03')
    ).toHaveTextContent('Thursday: 1 overlapping slot')
    expect(
      screen.getByTestId('calendar-availability-tooltip-content-2022-02-04')
    ).toHaveTextContent('Friday: 0 overlapping slots')
  })
})

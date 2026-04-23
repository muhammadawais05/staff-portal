import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DayOffCalendarDay from './DayOffCalendarDay'

type Props = ComponentProps<typeof DayOffCalendarDay>

const renderComponent = (props: Props) =>
  render(
    <TestWrapper>
      <DayOffCalendarDay {...props} />
    </TestWrapper>)

describe('DayOffCalendarDay', () => {
  describe('when date from the previous month', () => {
    it('renders editable component', () => {
      renderComponent({
        isMonthNext: false,
        isMonthPrev: true,
        dayOffs: new Set<number>([]),
        date: new Date('2022-1-1')
      } as Props)

      expect(screen.getByTestId('day-off-calendar-day-empty-container')).toBeInTheDocument()
      expect(screen.queryByTestId('day-off-calendar-day-date-container-1')).not.toBeInTheDocument()
    })
  })

  describe('when date from the next month', () => {
    it('renders editable component', () => {
      renderComponent({
        isMonthNext: true,
        isMonthPrev: false,
        dayOffs: new Set<number>([]),
        date: new Date('2022-1-1')
      } as Props)

      expect(screen.getByTestId('day-off-calendar-day-empty-container')).toBeInTheDocument()
      expect(screen.queryByTestId('day-off-calendar-day-date-container-1')).not.toBeInTheDocument()
    })
  })

  describe('when date from the current month', () => {
    it('renders editable component', () => {
      renderComponent({
        isMonthNext: false,
        isMonthPrev: false,
        getDayFormatted: (date: Date) => date.getDate(),
        dayOffs: new Set<number>([]),
        date: new Date('2022-1-1')
      } as unknown as Props)

      expect(screen.getByTestId('day-off-calendar-day-date-container-1')).toBeInTheDocument()
      expect(screen.queryByTestId('day-off-calendar-day-empty-container')).not.toBeInTheDocument()
    })
  })
})

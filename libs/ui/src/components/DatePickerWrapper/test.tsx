import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DatePickerWrapper, { Props } from './DatePickerWrapper'

const PLACEHOLDER_VALUE = 'dateInput'

const arrangeTest = ({ value, onChange }: Partial<Props>) =>
  render(
    <TestWrapper>
      <DatePickerWrapper
        value={value}
        onChange={onChange ?? jest.fn()}
        placeholder={PLACEHOLDER_VALUE}
      />
    </TestWrapper>
  )

describe('DatePickerWrapper', () => {
  describe('When date is selected', () => {
    it('outputs selected date as date string', async () => {
      const selectedDay = '15'
      const selectedDate = `2022-01-${selectedDay}`
      const onChangeMock = jest.fn()

      arrangeTest({
        value: '2022-01-01',
        onChange: onChangeMock
      })

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER_VALUE))
      const calendarDateButtons = screen.getAllByTestId(
        `day-button-${selectedDay}`
      )
      const todayCalendarDateButton = calendarDateButtons.find(
        calendarDate =>
          calendarDate.getAttribute('data-simple-react-calendar-day') ===
          selectedDate
      )

      fireEvent.click(todayCalendarDateButton as HTMLElement)

      expect(onChangeMock).toHaveBeenCalledWith(selectedDate)
    })
  })
})

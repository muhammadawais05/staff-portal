import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DEFAULT_ISO_DATE_FORMAT } from '@staff-portal/date-time-utils'

import DatePickerWrapperWithTimeZone, {
  Props
} from './DatePickerWrapperWithTimeZone'

const PLACEHOLDER_VALUE = 'dateInput'

const arrangeTest = ({ onChange, ...restProps }: Partial<Props>) =>
  render(
    <TestWrapper>
      <DatePickerWrapperWithTimeZone
        onChange={onChange ?? jest.fn()}
        placeholder={PLACEHOLDER_VALUE}
        timeZone='Europe/Moscow'
        {...restProps}
      />
    </TestWrapper>
  )

describe('DatePickerWrapperWithTimeZone', () => {
  describe('When date is selected', () => {
    describe('When timezone is not set', () => {
      it('outputs selected date as date-time string in the user timezone', async () => {
        const selectedDay = '15'
        const selectedDate = `2022-01-${selectedDay}`
        const onChangeMock = jest.fn()

        arrangeTest({
          value: '2022-01-01T00:00:00+03:00',
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

        expect(onChangeMock).toHaveBeenCalledWith('2022-01-15T00:00:00+03:00')
      })
    })

    describe('When custom timezone is set', () => {
      it('outputs selected date as date-time string in the given timezone', async () => {
        const selectedDay = '15'
        const selectedDate = `2022-01-${selectedDay}`
        const onChangeMock = jest.fn()

        arrangeTest({
          value: '2022-01-01T00:00:00-04:00',
          timeZone: 'America/Puerto_Rico',
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

        expect(onChangeMock).toHaveBeenCalledWith('2022-01-15T00:00:00-04:00')
      })
    })

    describe('When custom template is passed', () => {
      it('outputs selected date in the format that matches with passed template', async () => {
        const selectedDay = '15'
        const selectedDate = `2022-01-${selectedDay}`
        const onChangeMock = jest.fn()

        arrangeTest({
          value: '2022-01-01T00:00:00+03:00',
          outputDateFormat: DEFAULT_ISO_DATE_FORMAT,
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
})

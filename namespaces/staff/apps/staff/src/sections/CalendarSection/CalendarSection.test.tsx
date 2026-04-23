import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DayOffCalendar } from '@staff-portal/ui'
import { getCurrentDateWithTimeZone, WEEK_STARTS_ON } from '@staff-portal/date-time-utils'

import CalendarSection from './CalendarSection'
import Actions from './components/Actions/Actions'
import { useGetDayOffs } from './data/get-days-off.staff.gql'

jest.mock('./components/Actions/Actions', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  DayOffCalendar: jest.fn()
}))
jest.mock('./data/get-days-off.staff.gql', () => ({
  useGetDayOffs: jest.fn()
}))
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getCurrentDateWithTimeZone: jest.fn()
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: () => null
}))

const MockActions = Actions as jest.Mock
const MockDayOffCalendar = DayOffCalendar as jest.Mock
const mockUseGetDayOffs = useGetDayOffs as jest.Mock
const mockGetCurrentDateWithTimeZone = getCurrentDateWithTimeZone as jest.Mock

type Props = ComponentProps<typeof CalendarSection>

const renderComponent = (props: Props) =>
  render(
    <TestWrapper>
      <CalendarSection {...props} />
    </TestWrapper>
  )

describe('CalendarSection', () => {
  const selectedDate = Symbol('currentDate')

  beforeEach(() => {
    MockActions.mockReturnValueOnce(null)
    MockDayOffCalendar.mockReturnValueOnce(null)
    mockGetCurrentDateWithTimeZone.mockReturnValueOnce(selectedDate)
  })

  describe('on initial loading', () => {
    it('both Actions and DayOffCalendar are not rendered', () => {
      const dayOffs = Symbol('dayOffs')

      mockUseGetDayOffs.mockReturnValueOnce({
        dayOffs,
        loading: true,
        initialLoading: true
      })

      renderComponent({ staffId: 'staffProfileId' })

      expect(MockActions).toHaveBeenCalledTimes(0)
      expect(MockDayOffCalendar).toHaveBeenCalledTimes(0)
    })
  })

  describe('when data is loaded', () => {
    it('both Actions and DayOffCalendar are rendered', () => {
      const dayOffs = Symbol('dayOffs')

      mockUseGetDayOffs.mockReturnValueOnce({
        dayOffs,
        loading: false,
        initialLoading: false
      })

      renderComponent({ staffId: 'staffProfileId' })

      expect(MockActions).toHaveBeenCalledTimes(1)
      expect(MockActions).toHaveBeenCalledWith({
        updateMonth: expect.any(Function),
        selectedDate
      }, {})
      expect(MockDayOffCalendar).toHaveBeenCalledTimes(1)
      expect(MockDayOffCalendar).toHaveBeenCalledWith({
        today: selectedDate,
        dayOffs,
        activeMonth: selectedDate,
        minDate: selectedDate,
        weekStartsOn: WEEK_STARTS_ON
      }, {})
    })
  })
})

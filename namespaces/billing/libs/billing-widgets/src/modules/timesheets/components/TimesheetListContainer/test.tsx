import { useQuery } from '@apollo/client'
import React, { ComponentProps } from 'react'
import { within } from '@testing-library/react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetListContainer from '.'
jest.mock('../TimesheetList')

jest.mock('@apollo/client')

const render = (props: ComponentProps<typeof TimesheetListContainer>) =>
  renderComponent(<TimesheetListContainer {...props} />)

const mockUseQuery = useQuery as jest.Mock

describe('TimesheetListContainer', () => {
  describe('when Timesheets are associated to hourly cycles', () => {
    it('renders the regular TimesheetList', () => {
      mockUseQuery.mockReturnValue({
        data: {
          billingCyclesWithTimesheets: fixtures.MockBillingCyclesWithTimesheet
        }
      })
      const { queryAllByTestId } = render({
        limitElements: 5,
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      })

      const timesheetLists = queryAllByTestId('TimesheetList')

      expect(timesheetLists).toHaveLength(2)

      expect(
        within(timesheetLists[0]).getByTestId('TimesheetList-timesheets')
      ).toContainHTML('VjEtQmlsbGluZ0N5Y2xlLTMzNjkyOQ')
      expect(
        within(timesheetLists[1]).getByTestId('TimesheetList-timesheets')
      ).toHaveTextContent(/\[\]/g)
    })
  })

  describe('when timesheets are associated to `extraHours`', () => {
    it('renders the `extraHours` TimesheetList', () => {
      mockUseQuery.mockReturnValue({
        data: {
          billingCyclesWithTimesheets: [
            {
              ...fixtures.MockBillingCyclesWithTimesheet[0],
              timesheetExtraHours: true
            },
            {
              ...fixtures.MockBillingCyclesWithTimesheet[1],
              timesheetExtraHours: true
            },
            {
              ...fixtures.MockBillingCyclesWithTimesheet[2],
              timesheetExtraHours: true
            },
            {
              ...fixtures.MockBillingCyclesWithTimesheet[3],
              timesheetExtraHours: true
            }
          ]
        }
      })
      const { queryAllByTestId } = render({
        limitElements: 5,
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      })

      const timesheetLists = queryAllByTestId('TimesheetList')

      expect(timesheetLists).toHaveLength(2)

      expect(
        within(timesheetLists[0]).getByTestId('TimesheetList-timesheets')
      ).toHaveTextContent(/\[\]/g)
      expect(
        within(timesheetLists[1]).getByTestId('TimesheetList-timesheets')
      ).toContainHTML('VjEtQmlsbGluZ0N5Y2xlLTMzNjkyOQ')
    })
  })
})

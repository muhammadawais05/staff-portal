import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetModalView from '.'

jest.mock('../TimesheetSummary')
jest.mock('../TimesheetDayList')
jest.mock('../../../components/TimesheetModalFooter')

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TimesheetModalView>
) =>
  renderComponent(
    <TimesheetModalView {...props}>{children}</TimesheetModalView>
  )

describe('TimesheetModalView', () => {
  it('default render', () => {
    const { getByTestId } = render(null, {
      timesheet: fixtures.MockBillingCycle,
      timesheetRecords: []
    })

    expect(getByTestId('TimesheetDayList')).toBeInTheDocument()
  })
})

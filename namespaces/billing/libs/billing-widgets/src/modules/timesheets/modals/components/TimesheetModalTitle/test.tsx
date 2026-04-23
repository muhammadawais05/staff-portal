import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetModalTitle from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TimesheetModalTitle>
) =>
  renderComponent(
    <TimesheetModalTitle {...props}>{children}</TimesheetModalTitle>
  )

describe('TimesheetModalTitle', () => {
  it('default render', () => {
    const { container } = render('Timesheet', {
      timesheet: fixtures.MockBillingCycle
    })

    expect(container).toContainHTML('Timesheet (Apr 22, 2019 - May 5, 2019)')
  })
})

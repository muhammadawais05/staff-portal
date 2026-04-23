import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetDayStatic from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TimesheetDayStatic>
) =>
  renderComponent(
    <TimesheetDayStatic {...props}>{children}</TimesheetDayStatic>
  )

describe('TimesheetDayStatic', () => {
  it('default render', () => {
    const { container } = render(null, { hours: '2', minutes: '45' })

    expect(container).toMatchSnapshot()
  })
})

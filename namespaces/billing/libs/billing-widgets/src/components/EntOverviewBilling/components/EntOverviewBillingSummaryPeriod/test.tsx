import React, { ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewBillingSummaryPeriod from './EntOverviewBillingSummaryPeriod'

const render = (children: ReactNode) =>
  renderComponent(
    <EntOverviewBillingSummaryPeriod>
      {children}
    </EntOverviewBillingSummaryPeriod>
  )

describe('EntOverviewBillingSummaryPeriod', () => {
  it('default render', () => {
    const { container } = render(null)

    expect(container).toMatchSnapshot()
  })
})

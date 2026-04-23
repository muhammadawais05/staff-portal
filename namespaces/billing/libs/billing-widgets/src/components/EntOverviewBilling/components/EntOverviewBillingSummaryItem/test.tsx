import React, { ReactNode } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewBillingSummaryItem, {
  Props
} from './EntOverviewBillingSummaryItem'

const render = (children: ReactNode, props: Props) =>
  renderComponent(
    <EntOverviewBillingSummaryItem {...props}>
      {children}
    </EntOverviewBillingSummaryItem>
  )

describe('EntOverviewBillingSummaryItem', () => {
  it('default render', () => {
    const { container } = render(null, {
      item: { amount: 2134585, status: DocumentStatus.PAID }
    })

    expect(container).toMatchSnapshot()
  })
})

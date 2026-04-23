import React, { ComponentProps, ReactNode } from 'react'
import { myBilling as mockData } from '@staff-portal/billing/src/_fixtures/graphql/entOverview/overview'
import { BillingOverview } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewBilling from './EntOverviewBilling'

jest.mock('./components/EntOverviewBillingHeader')
jest.mock('./components/EntOverviewBillingSummary')
jest.mock('./components/EntOverviewBillingInvoicesTable')
jest.mock('./components/EntOverviewBillingPurchaseOrdersTable')
jest.mock('./components/EntOverviewBillingTimesheetsTable')

const render = (
  children: ReactNode,
  props: ComponentProps<typeof EntOverviewBilling>
) =>
  renderComponent(
    <EntOverviewBilling {...props}>{children}</EntOverviewBilling>
  )

describe('EntOverviewBilling', () => {
  it('default render', () => {
    const { container } = render(null, {
      data: mockData('2020-01-01').overview as BillingOverview
    })

    expect(container).toMatchSnapshot()
  })
})

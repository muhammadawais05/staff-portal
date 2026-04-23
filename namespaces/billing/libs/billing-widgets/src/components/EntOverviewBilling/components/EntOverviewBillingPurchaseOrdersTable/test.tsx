import React, { ReactNode } from 'react'
import { myBilling as mockData } from '@staff-portal/billing/src/_fixtures/graphql/entOverview/overview'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewBillingPurchaseOrdersTable, {
  Props,
  PurchaseOrdersTableVariant
} from './EntOverviewBillingPurchaseOrdersTable'

const render = (children: ReactNode, props: Props) =>
  renderComponent(
    <EntOverviewBillingPurchaseOrdersTable {...props}>
      {children}
    </EntOverviewBillingPurchaseOrdersTable>
  )

describe('EntOverviewBillingPurchaseOrdersTable', () => {
  it('With variant `closestToExpiration`', () => {
    const { container } = render(null, {
      purchaseOrders: mockData('2020-01-01').overview.purchaseOrdersExpiration,
      variant: PurchaseOrdersTableVariant.closestToExpiration
    })

    expect(container).toMatchSnapshot()
  })

  it('With variant `closestToLimit`', () => {
    const { container } = render(null, {
      purchaseOrders: mockData('2020-01-01').overview.purchaseOrdersLimit,
      variant: PurchaseOrdersTableVariant.closestToLimit
    })

    expect(container).toMatchSnapshot()
  })

  it('Without rows', () => {
    const { container } = render(null, {
      purchaseOrders: { nodes: [] },
      variant: PurchaseOrdersTableVariant.closestToExpiration
    })

    expect(container).toMatchSnapshot()
  })

  it('With null data', () => {
    const { container } = render(null, {
      purchaseOrders: null,
      variant: PurchaseOrdersTableVariant.closestToExpiration
    })

    expect(container).toMatchSnapshot()
  })
})

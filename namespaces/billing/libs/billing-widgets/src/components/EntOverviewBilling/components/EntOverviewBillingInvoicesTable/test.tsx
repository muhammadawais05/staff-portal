import MockDate from 'mockdate'
import React, { ReactNode } from 'react'
import { myBilling as mockData } from '@staff-portal/billing/src/_fixtures/graphql/entOverview/overview'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewBillingInvoicesTable, {
  InvoicesTableVariant,
  Props
} from './EntOverviewBillingInvoicesTable'

const render = (children: ReactNode, props: Props) =>
  renderComponent(
    <EntOverviewBillingInvoicesTable {...props}>
      {children}
    </EntOverviewBillingInvoicesTable>
  )

describe('EntOverviewBillingInvoicesTable', () => {
  beforeEach(() => MockDate.set('2020/01/07 15:00'))

  afterEach(() => MockDate.reset())

  it('variant `Disputed`', () => {
    const { container } = render(null, {
      invoices: mockData('2020-01-01').overview.invoicesDisputed,
      variant: InvoicesTableVariant.disputed
    })

    expect(container).toMatchSnapshot()
  })

  it('variant `Overdue`', () => {
    const { container } = render(null, {
      invoices: mockData('2020-01-01').overview.invoicesOverdue,
      variant: InvoicesTableVariant.overdue
    })

    expect(container).toMatchSnapshot()
  })

  it('Without rows', () => {
    const { container } = render(null, {
      invoices: { nodes: [] },
      variant: InvoicesTableVariant.disputed
    })

    expect(container).toMatchSnapshot()
  })

  it('With null data', () => {
    const { container } = render(null, {
      invoices: null,
      variant: InvoicesTableVariant.disputed
    })

    expect(container).toMatchSnapshot()
  })
})

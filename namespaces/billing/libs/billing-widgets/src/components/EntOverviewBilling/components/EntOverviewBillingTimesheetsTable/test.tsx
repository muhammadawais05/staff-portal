import MockDate from 'mockdate'
import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { myBilling as mockData } from '@staff-portal/billing/src/_fixtures/graphql/entOverview/overview'

import EntOverviewBillingTimesheetsTable from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof EntOverviewBillingTimesheetsTable>
) =>
  renderComponent(
    <EntOverviewBillingTimesheetsTable {...props}>
      {children}
    </EntOverviewBillingTimesheetsTable>
  )

describe('EntOverviewBillingTimesheetsTable', () => {
  beforeEach(() => MockDate.set('2020/01/07 15:00'))

  afterEach(() => MockDate.reset())

  it('default render', () => {
    const { container } = render(null, {
      timesheets: mockData('2020-01-01').overview.timesheets
    })

    expect(container).toMatchSnapshot()
  })

  it('data is a empty list', () => {
    const { container } = render(null, {
      timesheets: { nodes: [] }
    })

    expect(container).toMatchSnapshot()
  })

  it('data is null', () => {
    const { container } = render(null, {
      timesheets: null
    })

    expect(container).toMatchSnapshot()
  })
})

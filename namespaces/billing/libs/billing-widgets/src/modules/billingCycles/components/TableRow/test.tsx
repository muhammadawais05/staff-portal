import React, { ComponentProps } from 'react'
import { BillingCycleStatus } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableRow from '.'

jest.mock('../../../billingTable/components/BillingCommissions')
jest.mock('../TableRowChildren')
jest.mock('../CommitmentCell')
jest.mock('../TableRowConsolidatedInvoice')
jest.mock('../../../billingTable/components/BillingTableDocuments')

const render = (props: ComponentProps<typeof TableRow>) =>
  renderComponent(
    <table>
      <tbody>
        <TableRow {...props} />
      </tbody>
    </table>
  )

describe('BillingCycleTableRow', () => {
  it('default render with documents', () => {
    const { queryByTestId } = render({
      billingCycle: {
        ...fixtures.MockBillingCycleWithDocs,
        chargedHours: '10.0'
      }
    })

    expect(queryByTestId('start-date')).toContainHTML('Aug 12, 2019')
    expect(queryByTestId('end-date')).toContainHTML('Aug 25, 2019')
    expect(queryByTestId('kind')).toContainHTML('Development')
    expect(queryByTestId('BillingCycleTableRowCommitment')).toBeInTheDocument()
    expect(queryByTestId('hours')).toContainHTML('10')

    expect(queryByTestId('consolidated-icon')).toBeNull()
    expect(queryByTestId('consolidated-expand')).toBeNull()
  })

  it('with fractional hours', () => {
    const { queryByTestId } = render({
      billingCycle: {
        ...fixtures.MockBillingCycleWithDocs,
        chargedHours: '10.4'
      }
    })

    expect(queryByTestId('hours')).toContainHTML('10.4')
  })

  it('without documents', () => {
    const { queryByTestId } = render({
      billingCycle: {
        ...fixtures.MockBillingCycleWithDocs,
        commissions: [],
        invoices: [],
        payments: []
      }
    })

    expect(queryByTestId('invoices')).toContainHTML('Not issued yet')
  })

  it('With `status` `removed`', () => {
    const { queryByTestId } = render({
      billingCycle: {
        ...fixtures.MockBillingCycleWithDocs,
        status: BillingCycleStatus.removed
      }
    })

    expect(queryByTestId('start-date')).toContainHTML(
      'text-decoration: line-through'
    )
  })

  it('With `extraHours`', () => {
    const { queryByTestId } = render({
      billingCycle: {
        ...fixtures.MockBillingCycleWithDocs,
        actualCommitment: {
          ...fixtures.MockBillingCycleWithDocs.actualCommitment,
          availability: 'extra_hours'
        }
      }
    })

    expect(queryByTestId('extra-hours-icon')).toBeInTheDocument()

    expect(queryByTestId('BillingCycleTableRowConsolidatedInvoice')).toBeNull()
  })

  it('With consolidated invoices', () => {
    const { queryByTestId } = render({
      billingCycle: fixtures.MockConsolidatedBillingCycle
    })

    expect(
      queryByTestId('BillingCycleTableRowConsolidatedInvoice')
    ).not.toBeNull()
  })
})

import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingCycleTable from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof BillingCycleTable>
) =>
  renderComponent(<BillingCycleTable {...props}>{children}</BillingCycleTable>)

jest.mock('../TableRow')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const mockEngagementDocuments =
  fixtures.MockBillingCyclesTable.engagementDocuments
const mockBillingCyclesTable = fixtures.MockBillingCyclesTable.node

describe('BillingCycleTable', () => {
  it('default render', () => {
    const { queryAllByTestId } = render(null, {
      data: {
        engagementDocuments: mockEngagementDocuments,
        node: mockBillingCyclesTable
      }
    })

    expect(queryAllByTestId('BillingCycleTableRow')).toHaveLength(16)
  })

  it('with billing cycles but null documents', () => {
    const { queryAllByTestId } = render(null, {
      data: {
        engagementDocuments: null,
        node: mockBillingCyclesTable
      }
    })

    expect(queryAllByTestId('BillingCycleTableRow')).toHaveLength(48)
  })

  it('with billing cycles but undefined documents', () => {
    const { queryAllByTestId } = render(null, {
      data: {
        engagementDocuments: undefined,
        node: mockBillingCyclesTable
      }
    })

    expect(queryAllByTestId('BillingCycleTableRow')).toHaveLength(48)
  })

  it('with undefined billing cycles but including documents', () => {
    const { queryByTestId } = render(null, {
      data: {
        engagementDocuments: mockEngagementDocuments,
        node: undefined
      }
    })

    expect(queryByTestId('BillingCycleTableRow')).toBeNull()
  })

  it('with undefined billing cycles and undefined documents', () => {
    const { queryByTestId } = render(null, {
      data: {
        engagementDocuments: undefined,
        node: undefined
      }
    })

    expect(queryByTestId('BillingCycleTableRow')).toBeNull()
  })

  it('with empty billing cycles and undefined documents', () => {
    const { queryByTestId } = render(null, {
      data: {
        engagementDocuments: undefined,
        node: { billingCycles: { nodes: [] } }
      }
    })

    expect(queryByTestId('BillingCycleTableRow')).toBeNull()
  })

  it('with empty billing cycles but including documents', () => {
    const { queryByTestId } = render(null, {
      data: {
        engagementDocuments: mockEngagementDocuments,
        node: { billingCycles: { nodes: [] } }
      }
    })

    expect(queryByTestId('BillingCycleTableRow')).toBeNull()
  })
})

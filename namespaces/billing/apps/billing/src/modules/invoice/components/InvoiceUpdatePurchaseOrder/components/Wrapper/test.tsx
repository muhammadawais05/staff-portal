import { getNodeText } from '@toptal/picasso/test-utils'
import { merge } from 'lodash-es'
import React from 'react'
import { DocumentStatus, JobStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import InvoiceUpdatePurchaseOrder from '.'
import { GetInvoiceDetailsTableQuery } from '../../../InvoiceDetailsTable/data/getInvoiceDetailsTable.graphql.types'

type Invoice = GetInvoiceDetailsTableQuery['node']

jest.mock('../PurchaseOrderAssignment')

const buildProps = (variables?: Partial<Invoice>) => {
  const fixtureInvoice = JSON.parse(JSON.stringify(fixtures.MockInvoice))
  const defaults = {
    discountApplied: true,
    job: {
      hiredCount: 1,
      matcherCallScheduled: true,
      status: JobStatus.CLOSED,
      talentCount: 1
    },
    status: DocumentStatus.OUTSTANDING,
    subjectObject: {
      nodes: [],
      country: {
        name: 'United States'
      },
      preferredBillingOption: {
        discountable: true
      }
    }
  }

  return merge(fixtureInvoice, defaults, variables)
}

const render = (variables?: Partial<Invoice>) => {
  const invoice = buildProps(variables)

  return renderComponent(<InvoiceUpdatePurchaseOrder invoice={invoice} />)
}

describe('InvoiceUpdatePurchaseOrder', () => {
  it('Displays a warning when overbilling', () => {
    const { container, queryByTestId } = render({
      balanceDue: '10000.0',
      exceedsPurchaseOrderBalance: true,
      purchaseOrder: {
        budgetLeft: '50.0'
      }
    })

    const warning = queryByTestId('overbilling-warning')

    expect(warning).toBeInTheDocument()
    expect(warning).toHaveTextContent(
      'Warning: This invoice exceeds the balance remaining on PO #PO-1724 by $9,950.00'
    )

    expect(container).toMatchSnapshot()
  })

  it('disables PurchaseOrderAssignment toggle button when purchaseOrders are empty', () => {
    const { getByTestId } = renderComponent(
      <InvoiceUpdatePurchaseOrder
        invoice={{
          subject: {
            purchaseOrders: { nodes: [] }
          }
        }}
      />
    )

    const printedProps = getNodeText(getByTestId('PurchaseOrderAssignment'))

    expect(JSON.parse(printedProps)).toHaveProperty('isDisabled', true)
  })
})

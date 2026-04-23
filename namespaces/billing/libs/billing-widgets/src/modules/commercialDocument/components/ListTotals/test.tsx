import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { invoiceTotalSortOrder } from '../../../invoice/utils'
import { paymentTotalSortOrder } from '../../../payment/utils'
import ListTotals from './ListTotals'

const render = (props: ComponentProps<typeof ListTotals>) =>
  renderComponent(<ListTotals {...props} />)

describe('ListTotals', () => {
  describe('invoices', () => {
    describe('all values exist', () => {
      it('renders all possible 6 summary fields', () => {
        const { getByTestId } = render({
          totals: fixtures.MockInvoiceList.invoices.totals,
          sortOrder: invoiceTotalSortOrder
        })

        expect(getByTestId('ListTotals')).toBeInTheDocument()

        expect(getByTestId('ListTotals-outstanding-value')).toContainHTML(
          '$19,878,148.36'
        )
        expect(getByTestId('ListTotals-outstanding-label')).toContainHTML(
          'Outstanding'
        )
        expect(getByTestId('ListTotals-outstanding-variant')).toContainHTML(
          'label-yellow'
        )

        expect(getByTestId('ListTotals-overdue-value')).toContainHTML(
          '$2,025,589.53'
        )
        expect(getByTestId('ListTotals-overdue-label')).toContainHTML('Overdue')
        expect(getByTestId('ListTotals-overdue-variant')).toContainHTML(
          'label-red'
        )

        expect(getByTestId('ListTotals-disputed-value')).toContainHTML(
          '$16,628.32'
        )
        expect(getByTestId('ListTotals-disputed-label')).toContainHTML(
          'Disputed'
        )
        expect(getByTestId('ListTotals-disputed-variant')).toContainHTML(
          'label-red'
        )

        expect(getByTestId('ListTotals-inCollections-value')).toContainHTML(
          '$1,324,378.32'
        )
        expect(getByTestId('ListTotals-inCollections-label')).toContainHTML(
          'In collections'
        )
        expect(getByTestId('ListTotals-inCollections-variant')).toContainHTML(
          'label-red'
        )

        expect(getByTestId('ListTotals-writtenOff-value')).toContainHTML(
          '$324,378.32'
        )
        expect(getByTestId('ListTotals-writtenOff-label')).toContainHTML(
          'Written off'
        )
        expect(getByTestId('ListTotals-writtenOff-variant')).toContainHTML(
          'label-red'
        )

        expect(getByTestId('ListTotals-pendingReceipt-value')).toContainHTML(
          '$2,324,378.32'
        )
        expect(getByTestId('ListTotals-pendingReceipt-label')).toContainHTML(
          'Pending receipt'
        )
        expect(
          getByTestId('ListTotals-pendingReceipt-variant')?.innerHTML
        ).toBe('label-yellow')

        expect(getByTestId('ListTotals-credited-value')).toContainHTML(
          '$4,018,088.93'
        )
        expect(getByTestId('ListTotals-credited-label')).toContainHTML(
          'Credited'
        )
        expect(getByTestId('ListTotals-credited-variant')).toContainHTML(
          'label-yellow'
        )

        expect(getByTestId('ListTotals-paid-value')).toContainHTML(
          '$29,314,229.54'
        )
        expect(getByTestId('ListTotals-paid-label')).toContainHTML('Paid')
        expect(getByTestId('ListTotals-paid-variant')).toContainHTML(
          'label-green'
        )
      })
    })

    describe('partial values exist', () => {
      it('renders only non 0 groups', () => {
        const { queryByTestId } = render({
          totals: {
            ...fixtures.MockInvoiceList.invoices.totals,
            credited: '0',
            outstanding: '0'
          },
          sortOrder: invoiceTotalSortOrder
        })

        expect(queryByTestId('ListTotals-outstanding-value')).toBeNull()
        expect(queryByTestId('ListTotals-credited-value')).toBeNull()
      })
    })
  })

  describe('payments', () => {
    describe('all values exist', () => {
      it('renders all possible summary fields', () => {
        const { getByTestId } = render({
          totals: fixtures.MockPaymentList.payments.totals,
          sortOrder: paymentTotalSortOrder
        })

        expect(getByTestId('ListTotals')).toBeInTheDocument()

        expect(getByTestId('ListTotals-outstanding-value')).toContainHTML(
          '$13,837,253.09'
        )
        expect(getByTestId('ListTotals-outstanding-label')).toContainHTML(
          'Outstanding'
        )
        expect(getByTestId('ListTotals-outstanding-variant')).toContainHTML(
          'label-yellow'
        )

        expect(getByTestId('ListTotals-due-value')).toContainHTML('$107,863.74')
        expect(getByTestId('ListTotals-due-label')).toContainHTML('Due')
        expect(getByTestId('ListTotals-due-variant')).toContainHTML('label-red')

        expect(getByTestId('ListTotals-overdue-value')).toContainHTML(
          '$459,784.53'
        )
        expect(getByTestId('ListTotals-overdue-label')).toContainHTML('Overdue')
        expect(getByTestId('ListTotals-overdue-variant')).toContainHTML(
          'label-red'
        )

        expect(getByTestId('ListTotals-onHold-value')).toContainHTML(
          '$37,767.50'
        )
        expect(getByTestId('ListTotals-onHold-label')).toContainHTML('On hold')
        expect(getByTestId('ListTotals-onHold-variant')).toContainHTML(
          'label-yellow'
        )

        expect(getByTestId('ListTotals-disputed-value')).toContainHTML(
          '$28,715.74'
        )
        expect(getByTestId('ListTotals-disputed-label')).toContainHTML(
          'Disputed'
        )
        expect(getByTestId('ListTotals-disputed-variant')).toContainHTML(
          'label-red'
        )

        expect(getByTestId('ListTotals-debited-value')).toContainHTML(
          '$7,713,398.34'
        )
        expect(getByTestId('ListTotals-debited-label')).toContainHTML('Debited')
        expect(getByTestId('ListTotals-debited-variant')).toContainHTML(
          'label-yellow'
        )

        expect(getByTestId('ListTotals-paid-value')).toContainHTML(
          '$590,996,848.70'
        )
        expect(getByTestId('ListTotals-paid-label')).toContainHTML('Paid')
        expect(getByTestId('ListTotals-paid-variant')).toContainHTML(
          'label-green'
        )
      })
    })

    describe('partial values exist', () => {
      it('renders only non 0 groups', () => {
        const { queryByTestId } = render({
          totals: {
            ...fixtures.MockPaymentList.payments.totals,
            debited: '0',
            due: '0'
          },
          sortOrder: paymentTotalSortOrder
        })

        expect(queryByTestId('ListTotals-debited-value')).toBeNull()
        expect(queryByTestId('ListTotals-due-value')).toBeNull()
      })
    })
  })
})

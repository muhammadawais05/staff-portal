import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentListTable from '.'

const { totals: tableTotals } = fixtures.MockPaymentList.payments

jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')
jest.mock('../PaymentListHeader')

const render = (props: ComponentProps<typeof PaymentListTable>) =>
  renderComponent(<PaymentListTable {...props} />)

const mockPaymentsAmount =
  fixtures.MockPaymentList.payments.groups[0].payments.length

describe('PaymentListTable', () => {
  it('default render', () => {
    const { queryByText, getAllByTestId } = render({
      payments: {
        loading: false,
        initialLoading: false,
        data: {
          groups: fixtures.MockPaymentList.payments.groups
        }
      },
      totals: {
        data: { groups: [{ totals: tableTotals, year: 2020, month: 10 }] },
        loading: false,
        initialLoading: false
      }
    })

    fixtures.MockPaymentList.payments.groups[0].payments.forEach(payment => {
      expect(queryByText(`#${payment.documentNumber}`)).toBeInTheDocument()
    })
    expect(getAllByTestId('more-actions-button')).toHaveLength(
      mockPaymentsAmount
    )
  })

  it('handles payments loading state', () => {
    const { container } = render({
      payments: {
        loading: true,
        initialLoading: true,
        data: undefined
      },
      totals: {
        data: undefined,
        loading: false,
        initialLoading: false
      }
    })

    expect(container.querySelector('tbody')).toContainHTML(
      'SkeletonLoader.Typography'
    )
  })

  it('handles totals loading state', () => {
    const { queryByTestId } = render({
      payments: {
        loading: false,
        initialLoading: false,
        data: fixtures.MockPaymentList.payments
      },
      totals: {
        data: undefined,
        loading: true,
        initialLoading: false
      }
    })

    expect(queryByTestId('LoaderOverlay')).toBeInTheDocument()
  })
})

import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import { DocumentStatus, PaymentKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useListTableRowExpandState } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import PaymentListRow from '.'

jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')
jest.mock('../../../payment/components/PaymentRowAction')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
)
jest.mock('@staff-portal/billing-widgets/src/modules/commercialDocument/utils')

const render = (props: ComponentProps<typeof PaymentListRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <PaymentListRow {...props} />
      </Table.Body>
    </Table>
  )

const mockUseListTableRowExpandState = useListTableRowExpandState as jest.Mock

describe('ReceivedPaymentListRow', () => {
  beforeAll(() => MockDate.set('2020-01-01T19:00:00.000+00:00'))

  afterAll(() => MockDate.reset())

  it('default render', () => {
    mockUseListTableRowExpandState.mockReturnValue({
      isExpanded: jest.fn().mockReturnValue(false),
      handleOnExpandClick: jest.fn()
    })

    const { queryByTestId } = render({
      handleOnActionClick: jest.fn(),
      handleOnExpandClick: jest.fn(),
      payment: fixtures.MockPayment
    })

    expect(
      queryByTestId('ReceivedPaymentListRow-collapsed-description')
    ).toBeInTheDocument()
    expect(
      queryByTestId('ReceivedPaymentListRow-expanded-description')
    ).not.toBeInTheDocument()

    expect(queryByTestId('payment-group-id')).toHaveTextContent('PG #94691')
    expect(queryByTestId('ReceivedPaymentListRow-status')).toContainHTML('DUE')
    expect(queryByTestId('CommercialDocumentStatus-tooltip')).toBeNull()

    expect(queryByTestId('ReceivedPaymentListRow-amount')).toContainHTML(
      '$0.00'
    )
    expect(
      queryByTestId('ReceivedPaymentListRow-created-on-date')
    ).toContainHTML('Jul 21, 2020')
    expect(queryByTestId('ReceivedPaymentListRow-paid-on-date')).toContainHTML(
      'Jul 22, 2020'
    )
    expect(
      queryByTestId('ReceivedPaymentListRow-collapsed-description')
    ).toContainHTML('test')
  })

  it('expanded render', () => {
    mockUseListTableRowExpandState.mockReturnValue({
      isExpanded: jest.fn().mockReturnValue(true),
      handleOnExpandClick: jest.fn()
    })

    const { queryByTestId } = render({
      handleOnActionClick: jest.fn(),
      handleOnExpandClick: jest.fn(),
      payment: {
        ...fixtures.MockPayment,
        description: 'Long description'
      }
    })

    expect(
      queryByTestId('ReceivedPaymentListRow-collapsed-description')
    ).not.toBeInTheDocument()
    expect(
      queryByTestId('ReceivedPaymentListRow-expanded-description')
    ).toBeInTheDocument()
    expect(
      queryByTestId('ReceivedPaymentListRow-expanded-description')
    ).toContainHTML('Long description')
  })

  describe('Date columns', () => {
    it('will not render `Created On` & `Paid On` content when dates are not defined', () => {
      const { queryByText } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        payment: {
          ...fixtures.MockPayment,
          dueDate: undefined,
          paidAt: undefined
        }
      })

      expect(queryByText('Due on Jul 21')).not.toBeInTheDocument()
      expect(queryByText('Jul 22, 2020')).not.toBeInTheDocument()
    })

    it('will render `Created On` & `Paid On` when these dates are defined and Payment is PAID', () => {
      const { queryByText } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        payment: {
          ...fixtures.MockPayment,
          paymentKind: PaymentKind.TALENT_PAYMENT,
          status: DocumentStatus.PAID
        }
      })

      expect(queryByText('Jul 21, 2020')).toBeInTheDocument()
      expect(queryByText('Jul 22, 2020')).toBeInTheDocument()
    })

    describe('when paymentGroupId is set', () => {
      it('will render the subtext of it', () => {
        const { queryByTestId } = render({
          handleOnActionClick: jest.fn(),
          handleOnExpandClick: jest.fn(),
          payment: {
            ...fixtures.MockPayment,
            paymentKind: PaymentKind.TALENT_PAYMENT,
            paymentGroupId: 'VjEtUGF5bWVudEdyb3VwLTE5NTY0OA'
          }
        })

        expect(queryByTestId('payment-group-id')).toContainHTML('(PG #195648)')
      })
    })
  })
})

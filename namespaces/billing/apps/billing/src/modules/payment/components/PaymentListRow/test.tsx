import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import { DocumentStatus, PaymentKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useListTableRowExpandState } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import PaymentListRow from '.'

jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')
jest.mock('../PaymentRowAction')
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

describe('PaymentListRow', () => {
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
      queryByTestId('PaymentListRow-collapsed-description')
    ).toBeInTheDocument()
    expect(
      queryByTestId('PaymentListRow-expanded-description')
    ).not.toBeInTheDocument()

    expect(queryByTestId('PaymentListRow-payment-id-link')).toHaveTextContent(
      '#1104428'
    )
    expect(queryByTestId('PaymentListRow-status')).toContainHTML('DUE')
    expect(queryByTestId('PaymentListRow-recipient')).toContainHTML(
      'José Silva'
    )
    expect(queryByTestId('PaymentListRow-amount')).toContainHTML('$0.00')
    expect(queryByTestId('PaymentListRow-created-on-date')).toContainHTML(
      'Jul 21, 2020'
    )
    expect(queryByTestId('PaymentListRow-collapsed-description')).toContainHTML(
      'test'
    )
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
      queryByTestId('PaymentListRow-collapsed-description')
    ).not.toBeInTheDocument()
    expect(
      queryByTestId('PaymentListRow-expanded-description')
    ).toBeInTheDocument()
    expect(queryByTestId('PaymentListRow-expanded-description')).toContainHTML(
      'Long description'
    )
  })

  describe('when Payment is part of a Payment Group', () => {
    it('renders payment group link', () => {
      const { queryByTestId } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        payment: {
          ...fixtures.MockPayment,
          paymentGroup: {
            id: 'VjEtUGF5bWVudEdyb3VwLTE4ODQxNw',
            webResource: {
              __typename: 'Link',
              text: 'Payment Group 188417',
              url: 'https://staging.toptal.net/platform/staff/payment_groups/188417'
            },
            __typename: 'PaymentGroup'
          }
        }
      })

      expect(queryByTestId('PaymentListRow-pglink')).toBeInTheDocument()
    })
  })

  describe('Date columns', () => {
    it('will not render `Date Issued` & `Due Date` content when dates are not defined', () => {
      const { queryByText } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        payment: {
          ...fixtures.MockPayment,
          dueDate: undefined
        }
      })

      expect(queryByText('Due on Jul 21')).not.toBeInTheDocument()
    })

    it('will render `Date Issued` & `Due Date` when these dates are defined and Payment is not a commission', () => {
      const { queryByText } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        payment: {
          ...fixtures.MockPayment,
          paymentKind: PaymentKind.TALENT_PAYMENT,
          status: DocumentStatus.OUTSTANDING
        }
      })

      expect(queryByText('Jul 21, 2020')).toBeInTheDocument()
    })

    it('will render `Date Issued` without `Due Date` when these dates are defined, but status is WRITTEN_OFF', () => {
      const { queryByText } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        payment: {
          ...fixtures.MockPayment,
          status: DocumentStatus.WRITTEN_OFF
        }
      })

      expect(queryByText('Jul 21, 2020')).toBeInTheDocument()
      expect(queryByText('Due on Jul 21')).not.toBeInTheDocument()
    })

    it('will not render `Due Date` when Payment is a commission', () => {
      const { queryByText } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        payment: {
          ...fixtures.MockPayment,
          paymentKind: PaymentKind.ROLE_STEP_COMMISSION,
          status: DocumentStatus.OUTSTANDING
        }
      })

      expect(queryByText('Jul 21, 2020')).toBeInTheDocument()
      expect(queryByText('Due on Jul 21')).not.toBeInTheDocument()
    })
  })
})

import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupPaymentsTable from '.'
import { useGetPaymentGroupDetailsPaymentsQuery } from '../../data'
import { usePaymentGroupActionHandler } from '../../utils'

jest.mock('../../utils')
jest.mock('../../data')
jest.mock('../../../commercialDocument/components/ListTable')
jest.mock('@staff-portal/billing/src/components/MonthlyTotals')
jest.mock('../PaymentGroupPaymentsRow')
jest.mock('../PaymentGroupPaymentsTableHeader')
jest.mock('@staff-portal/billing/src/components/ContentLoader', () =>
  jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='ContentLoader'>{children}</div>
    ))
)

const render = (props: ComponentProps<typeof PaymentGroupPaymentsTable>) =>
  renderComponent(<PaymentGroupPaymentsTable {...props} />)

const useGetPaymentsMock = useGetPaymentGroupDetailsPaymentsQuery as jest.Mock

describe('PaymentGroupPaymentsTable', () => {
  ;(usePaymentGroupActionHandler as jest.Mock).mockImplementation(() => ({
    handleOnActionClick: jest.fn()
  }))

  describe('when no data returned', () => {
    it('default render', () => {
      useGetPaymentsMock.mockReturnValue({
        data: null,
        loading: false
      })

      const { queryByTestId } = render({
        paymentGroupId: 'abc123'
      })

      expect(queryByTestId('ListTable-emptyMessage')).toBeInTheDocument()
    })
  })

  describe('when data value returned', () => {
    it('default render', () => {
      useGetPaymentsMock.mockReturnValue({
        data: {
          node: fixtures.MockPaymentGroupDetails
        },
        loading: false
      })

      const { queryAllByTestId, queryByTestId } = render({
        paymentGroupId: 'abc123'
      })

      expect(queryAllByTestId('PaymentGroupPaymentsRow')).toHaveLength(6)
      expect(
        queryByTestId('PaymentGroupPaymentsTableHeader')
      ).toBeInTheDocument()
      expect(queryAllByTestId('MonthlyTotals')).toHaveLength(2)
    })
  })
})

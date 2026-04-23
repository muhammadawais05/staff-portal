import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PaymentMultiplePayModal from '.'
import { useGetMultiplePaymentsListQuery } from '../../../../data/getMultiplePaymentsList.graphql.types'
import adjustValues from './adjustValues'

jest.mock('../PaymentMultiplePayModalForm')
jest.mock('../../../../data/getMultiplePaymentsList.graphql.types')

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => [jest.fn()],
  useMutation: () => [jest.fn()]
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({ handleOnCloseModal: jest.fn() })
}))

const render = (props: ComponentProps<typeof PaymentMultiplePayModal>) =>
  renderComponent(<PaymentMultiplePayModal {...props} />)

describe('PaymentMultiplePayModal', () => {
  it('default render', () => {
    useGetMultiplePaymentsListQuery.mockReturnValue({
      error: null,
      loading: false,
      data: {
        payments: {
          ...fixtures.MockPaymentList.payments,
          nodes: fixtures.MockPaymentList.payments.groups[0].payments.flatMap(
            payment => payment
          )
        }
      }
    })

    const { container } = render({
      options: {
        data: {
          statuses: [DocumentStatus.DUE, DocumentStatus.OVERDUE]
        }
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('handle empty list of payments', () => {
    useGetMultiplePaymentsListQuery.mockReturnValue({
      error: null,
      loading: false,
      data: {
        payments: {
          ...fixtures.MockPaymentList.payments,
          nodes: []
        }
      }
    })
    const { queryByTestId } = render({
      options: {
        data: {
          statuses: [DocumentStatus.DUE, DocumentStatus.OVERDUE]
        }
      }
    })

    expect(queryByTestId('PaymentMultiplePayModal')).not.toBeInTheDocument()
  })
})

describe('#adjustValues', () => {
  it('will remove isEverythingSelected from the values object', () => {
    const paymentIds = ['1', '2']
    const actual = adjustValues({ isEverythingSelected: true, paymentIds })
    const expected = { paymentIds }

    expect(actual).toEqual(expected)
  })
})

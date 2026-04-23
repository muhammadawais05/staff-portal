import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PaymentGroupMultiplePayModal from '.'
import { useGetPaymentGroupsListQuery } from '../../../../data/getPaymentGroupsList.graphql.types'
import adjustValues from './adjustValues'

jest.mock('../PaymentGroupMultiplePayModalForm')
jest.mock('../../../../data/getPaymentGroupsList.graphql.types')

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => [jest.fn()],
  useMutation: () => [jest.fn()]
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({ handleOnCloseModal: jest.fn() })
}))

const render = (props: ComponentProps<typeof PaymentGroupMultiplePayModal>) =>
  renderComponent(<PaymentGroupMultiplePayModal {...props} />)

describe('PaymentGroupMultiplePayModal', () => {
  it('default render', () => {
    ;(useGetPaymentGroupsListQuery as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      data: fixtures.MockPaymentGroupList
    })

    const { getByTestId } = render({
      options: {
        data: {
          statuses: [DocumentStatus.DUE, DocumentStatus.OVERDUE]
        }
      }
    })

    expect(getByTestId('PaymentGroupMultiplePayModalForm')).toBeInTheDocument()
  })

  it('handle empty list of paymentGroups', () => {
    ;(useGetPaymentGroupsListQuery as jest.Mock).mockReturnValue({
      error: null,
      loading: false,
      data: {
        nodes: []
      }
    })
    const { queryByTestId } = render({
      options: {
        data: {
          statuses: [DocumentStatus.DUE, DocumentStatus.OVERDUE]
        }
      }
    })

    expect(
      queryByTestId('PaymentGroupMultiplePayModalForm')
    ).not.toBeInTheDocument()
  })
})

describe('#adjustValues', () => {
  it('will remove isEverythingSelected from the values object', () => {
    const paymentGroupIds = ['1', '2']
    const actual = adjustValues({ isEverythingSelected: true, paymentGroupIds })
    const expected = { paymentGroupIds }

    expect(actual).toEqual(expected)
  })
})

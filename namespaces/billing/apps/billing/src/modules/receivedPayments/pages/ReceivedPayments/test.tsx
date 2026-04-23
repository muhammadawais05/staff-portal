import React from 'react'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ReceivedPayments from '.'

jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('@apollo/client')
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({
    showError: jest.fn(),
    showSuccess: jest.fn()
  })
}))
jest.mock('@staff-portal/billing/src/components/ListPage')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/paymentGroup/utils',
  () => ({
    usePaymentGroupActionHandler: () => ({
      usePaymentGroupActionHandler: jest.fn()
    })
  })
)
jest.mock('../../../payment/data/getPaymentsList.graphql.types')
jest.mock('../../../payment/components/ListSearch')
jest.mock('../../../payment/components/PaymentListTable')
jest.mock('../../components/ReceivedPaymentsTotals', () => () => <></>)
jest.mock('../../components/ReceivedPaymentsListHeader', () => () => <></>)
jest.mock('../../components/ReceivedPaymentListRow')

const render = () => renderComponent(<ReceivedPayments />)
const useGetDataMock = useGetData as jest.Mock

describe('ReceivedPayments', () => {
  it('default render', () => {
    useGetDataMock.mockReturnValue(() => ({
      data: fixtures.MockPaymentList,
      error: false,
      loading: false
    }))
    const { getByTestId } = render()

    expect(getByTestId('PaymentListTable')).toBeInTheDocument()
    expect(getByTestId('ListPagination')).toBeInTheDocument()
  })
})

import React, { ComponentProps } from 'react'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentList from '.'

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
jest.mock('../../data/getPaymentsList.graphql.types')
jest.mock('../../components/ListSearch')
jest.mock('../../components/PaymentListTable')
jest.mock('../../components/PaymentListChart')
jest.mock('../../components/PaymentListHeader')
jest.mock('../../components/PaymentListTotals')

const render = (props: ComponentProps<typeof PaymentList> = {}) =>
  renderComponent(<PaymentList {...props} />)

describe('PaymentList', () => {
  it('default render', () => {
    ;(useGetData as jest.Mock).mockReturnValue(() => ({
      data: fixtures.MockPaymentList,
      error: false,
      loading: false
    }))
    const { getByTestId } = render()

    expect(getByTestId('PaymentListTable')).toBeInTheDocument()
    expect(getByTestId('PaymentListTotals')).toBeInTheDocument()
    expect(getByTestId('PaymentListChart')).toBeInTheDocument()
    expect(getByTestId('ListPagination')).toBeInTheDocument()
  })
})

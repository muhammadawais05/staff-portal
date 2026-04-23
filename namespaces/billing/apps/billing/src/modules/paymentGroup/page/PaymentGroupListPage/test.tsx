import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'

import PaymentGroupListPage from '.'

jest.mock('@apollo/client')
jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('../../data')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/paymentGroup/utils',
  () => ({
    usePaymentGroupActionHandler: jest.fn().mockImplementation(() => ({
      handleOnActionClick: jest.fn()
    }))
  })
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable'
)
jest.mock('@staff-portal/billing/src/components/ListPage')
jest.mock('../../components/PaymentGroupListHeader')
jest.mock('../../components/PaymentGroupListTableHeader')
jest.mock('../../components/PaymentGroupListTableRow')

const render = () => renderComponent(<PaymentGroupListPage />)

const MockGetData = useGetData as jest.Mock

describe('PaymentGroupListPage', () => {
  it('default render', () => {
    MockGetData.mockReturnValue({
      data: fixtures.MockPaymentGroupList.paymentGroupsNullable,
      error: false,
      loading: false
    })

    const { getByTestId } = render()

    expect(getByTestId('ListPage-title')).toHaveTextContent(/^Payment Groups$/)
    expect(getByTestId('PaymentGroupListTableHeader')).toBeInTheDocument()
  })

  it('no data render', () => {
    MockGetData.mockReturnValue({
      data: null,
      error: false,
      loading: false
    })

    const { getByTestId } = render()

    expect(getByTestId('ListPage-title')).toHaveTextContent(/^Payment Groups$/)
    expect(getByTestId('ListTable-emptyMessage')).toHaveTextContent(
      'There are no payment groups for this search criteria'
    )
  })
})

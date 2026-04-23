import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import {
  useGetBillingOptionUpdateQuery,
  useSetUpdateBillingOptionMutation
} from '../../data'
import BillingOptionUpdateModal from './index'

jest.mock('../../data')
jest.mock('../BillingOptionUpdateModalForm')

const mockUseGetBillingOptionUpdateQuery =
  useGetBillingOptionUpdateQuery as jest.Mock
const mockUseSetUpdateBillingOptionMutation =
  useSetUpdateBillingOptionMutation as jest.Mock

mockUseSetUpdateBillingOptionMutation.mockReturnValue([jest.fn()])

describe('BillingOptionUpdateModal', () => {
  it('renders a form', () => {
    mockUseGetBillingOptionUpdateQuery.mockReturnValue({
      data: { node: fixtures.MockClient }
    })

    const { getByTestId } = renderComponent(
      <BillingOptionUpdateModal
        options={{
          nodeId: fixtures.MockClient.billingOptions.nodes[1].id,
          clientId: fixtures.MockClient.id
        }}
      />
    )

    expect(getByTestId('BillingOptionUpdateModalForm-title')).toHaveTextContent(
      'Edit billing option'
    )
    expect(
      getByTestId('BillingOptionUpdateModalForm-initialValues')
    ).toHaveTextContent(
      JSON.stringify({ nameOnAccount: 'Account name', bankName: 'Bank name' })
    )
    expect(
      getByTestId('BillingOptionUpdateModalForm-billingMethod')
    ).toHaveTextContent(
      fixtures.MockClient.billingOptions.nodes[1].billingMethod
    )
  })
})

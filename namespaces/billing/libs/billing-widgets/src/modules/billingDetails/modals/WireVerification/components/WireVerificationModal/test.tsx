import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import {
  useSetVerifyWireBillingOptionMutation,
  useSetUnverifyWireBillingOptionMutation
} from '../../data'
import WireVerificationModal from './'

jest.mock('../WireVerificationModalForm')
jest.mock('../../data')

const mockUseSetVerifyWireBillingOptionMutation =
  useSetVerifyWireBillingOptionMutation as jest.Mock
const mockUseSetUnverifyWireBillingOptionMutation =
  useSetUnverifyWireBillingOptionMutation as jest.Mock

describe('WireVerificationModal', () => {
  it('renders a form', () => {
    mockUseSetVerifyWireBillingOptionMutation.mockReturnValue([jest.fn()])
    mockUseSetUnverifyWireBillingOptionMutation.mockReturnValue([jest.fn()])

    const { getByTestId } = renderComponent(
      <WireVerificationModal
        options={{
          nodeId: fixtures.MockClient.billingOptions.nodes[1].id,
          isVerify: true
        }}
      />
    )

    expect(getByTestId('WireVerificationModalForm')).toBeInTheDocument()
    expect(getByTestId('WireVerificationModalForm-isVerify')).toHaveTextContent(
      'true'
    )
  })
})

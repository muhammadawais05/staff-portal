import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import RefundClientCreditBalance from '.'
import { useGetRefundClientCreditBalanceQuery } from '../../data'

jest.mock('../RefundClientCreditBalanceForm')
jest.mock('../../data', () => ({
  ...jest.requireActual('../../data'),
  useSetRefundClientCreditBalanceMutation: jest.fn(() => [
    'useSetRefundClientCreditBalanceMutation'
  ]),
  useGetRefundClientCreditBalanceQuery: jest.fn()
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (props: ComponentProps<typeof RefundClientCreditBalance>) =>
  renderComponent(<RefundClientCreditBalance {...props} />)

const mockGetDisputeResolveQuery =
  useGetRefundClientCreditBalanceQuery as jest.Mock

describe('RefundClientCreditBalance', () => {
  it('default render', () => {
    mockGetDisputeResolveQuery.mockReturnValue({
      data: {
        node: fixtures.MockClient
      },
      error: undefined,
      loading: false
    })

    const { getByTestId } = render({
      options: { nodeId: fixtures.MockClient.id, nodeType: 'client' }
    })

    expect(getByTestId('RefundClientCreditBalance')).toBeInTheDocument()
    expect(getByTestId('RefundClientCreditBalance')).toHaveTextContent(
      '{"initialValues":{"amount":"1350.00","clientId":"VjEtQ2xpZW50LVZqRXRRMnhwWlc1MExUSXhOek00T1E","comment":"","notifyReceiver":false},"clientName":"Casper, Johnson and Larkin"}'
    )
  })

  it('loading render', () => {
    mockGetDisputeResolveQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      loading: true
    })

    const { getByTestId } = render({
      options: { nodeId: fixtures.MockClient.id, nodeType: 'client' }
    })

    expect(getByTestId('LoaderOverlay')).toBeInTheDocument()
  })
})

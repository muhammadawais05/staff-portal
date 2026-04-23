import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentCancel from '.'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('../../components/CancelPaymentForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)
jest.mock('./data/cancelPayment.graphql.types', () => ({
  useCancelPaymentMutation: jest.fn()
}))
const cancelPaymentMutation = jest.requireMock(
  './data/cancelPayment.graphql.types'
).useCancelPaymentMutation as jest.Mock

const render = (props: ComponentProps<typeof PaymentCancel>) =>
  renderComponent(<PaymentCancel {...props} />)

describe('PaymentCancel', () => {
  beforeEach(() => {
    cancelPaymentMutation.mockImplementation(() => ['exampleSubmit'])
  })

  it('default render', () => {
    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockPayment.documentNumber.toString()
      }
    })

    expect(queryByTestId('CancelPaymentForm')).toHaveTextContent('1104428')
  })
})

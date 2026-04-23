import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupCancel from '.'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('../../components/CancelPaymentGroupForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)
jest.mock('./data/cancelPaymentGroup.graphql.types', () => ({
  useCancelPaymentGroupMutation: jest.fn()
}))
const cancelPaymentGroupMutation = jest.requireMock(
  './data/cancelPaymentGroup.graphql.types'
).useCancelPaymentGroupMutation as jest.Mock

const render = (props: ComponentProps<typeof PaymentGroupCancel>) =>
  renderComponent(<PaymentGroupCancel {...props} />)

describe('PaymentGroupCancel', () => {
  beforeEach(() => {
    cancelPaymentGroupMutation.mockImplementation(() => ['exampleSubmit'])
  })

  it('default render', () => {
    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockPaymentGroup.number.toString()
      }
    })

    expect(queryByTestId('CancelPaymentGroupForm')).toHaveTextContent('186344')
  })
})

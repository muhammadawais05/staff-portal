import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentPayModalContent from '.'

jest.mock('@staff-portal/billing/src/components/AlertModal')
jest.mock('../../../../components/PaymentPayModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('../../data', () => ({
  ...(jest.requireActual('../../data') as object),
  useSetPayPaymentMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof PaymentPayModalContent>) => {
  return renderComponent(<PaymentPayModalContent {...props} />)
}

describe('PaymentPayModalContent', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      payment: fixtures.MockPayment
    })

    expect(queryByTestId('PaymentPayModalForm')).toHaveTextContent(
      'VjEtUGF5bWVudC0xMTA0NDI4'
    )
  })
})

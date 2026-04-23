import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupPayModalContent from '.'

jest.mock('@staff-portal/billing/src/components/AlertModal')
jest.mock('../PaymentGroupPayModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof PaymentGroupPayModalContent>) => {
  return renderComponent(<PaymentGroupPayModalContent {...props} />)
}

describe('PaymentGroupPayModalContent', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      paymentGroup: fixtures.MockPaymentGroup
    })

    expect(queryByTestId('PaymentGroupPayModalForm')).toHaveTextContent(
      'VjEtUGF5bWVudEdyb3VwLTE4NjM0NA'
    )
  })
})

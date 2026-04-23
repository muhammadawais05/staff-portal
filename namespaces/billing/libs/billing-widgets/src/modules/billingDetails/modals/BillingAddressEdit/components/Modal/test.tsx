import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import BillingAddressEditModal from '.'

jest.mock('../ModalForm')
jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('../../../../../billingSettings/data')
jest.mock('@apollo/client', () => ({
  ...(jest.requireActual('@apollo/client') as object),
  useQuery: () => [jest.fn()]
}))
jest.mock('../../data', () => ({
  ...(jest.requireActual('../../data') as object),
  useSetUpdateClientBillingAddressMutation: () => [jest.fn()]
}))

const render = () =>
  renderComponent(
    <BillingAddressEditModal
      options={{
        nodeId: fixtures.MockClient.id.toString()
      }}
    />
  )

describe('BillingAddressEditModal', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('BillingAddressEditModalForm')).toBeInTheDocument()
  })
})

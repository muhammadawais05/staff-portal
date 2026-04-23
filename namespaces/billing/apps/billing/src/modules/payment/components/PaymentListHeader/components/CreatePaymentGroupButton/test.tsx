import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CreatePaymentGroupButton from './CreatePaymentGroupButton'

const mockMutation = jest.fn()

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: () => [mockMutation]
}))

const render = (props: ComponentProps<typeof CreatePaymentGroupButton>) =>
  renderComponent(<CreatePaymentGroupButton {...props} />)

describe('CreatePaymentGroupButton', () => {
  describe('when operation is missing', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        operation: undefined
      })
      const button = queryByTestId('CreatePaymentGroupButton')

      expect(button).toBeNull()
    })
  })

  describe('when the operation is Enabled', () => {
    it('renders the Create Payment Group button with proper details', () => {
      const { getByTestId } = render({
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: ['']
        }
      })
      const button = getByTestId('CreatePaymentGroupButton')

      expect(button).toBeEnabled()
      expect(button).toContainHTML('Create Payment Group')
    })
  })

  describe('when the operation is Disabled', () => {
    it('renders the Create Payment Group button as disabled', () => {
      const { getByTestId } = render({
        operation: {
          callable: OperationCallableTypes.DISABLED,
          messages: ['']
        }
      })
      const button = getByTestId('CreatePaymentGroupButton')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when the operation is Hidden', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: ['']
        }
      })

      const button = queryByTestId('CreatePaymentGroupButton')

      expect(button).toBeNull()
    })
  })
})

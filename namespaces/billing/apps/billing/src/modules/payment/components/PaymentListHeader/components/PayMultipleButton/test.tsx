import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PayMultipleButton from './PayMultipleButton'

const render = (props: ComponentProps<typeof PayMultipleButton>) =>
  renderComponent(<PayMultipleButton {...props} />)

describe('PayMultipleButton', () => {
  describe('when operation is missing', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        operation: undefined
      })
      const button = queryByTestId('PayMultipleButton')

      expect(button).toBeNull()
    })
  })

  describe('when the operation is Enabled', () => {
    it('renders the Pay button with proper details', () => {
      const { getByTestId } = render({
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: ['']
        }
      })
      const button = getByTestId('PayMultipleButton')

      expect(button).toBeEnabled()
      expect(button).toContainHTML('Pay Multiple')
    })
  })

  describe('when the operation is Disabled', () => {
    it('renders the Pay button as disabled', () => {
      const { getByTestId } = render({
        operation: {
          callable: OperationCallableTypes.DISABLED,
          messages: ['']
        }
      })
      const button = getByTestId('PayMultipleButton')

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
      const button = queryByTestId('PayMultipleButton')

      expect(button).toBeNull()
    })
  })
})

import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import JobBillingDefaultsActions from './JobBillingDefaultsActions'

const render = (props: ComponentProps<typeof JobBillingDefaultsActions>) =>
  renderComponent(<JobBillingDefaultsActions {...props} />)

describe('JobBillingDefaultsActions', () => {
  describe("when it's `create` type", () => {
    it('renders component properly', () => {
      const { getByTestId } = render({
        type: 'create',
        handleOnClick: jest.fn()
      })
      const button = getByTestId('JobBillingDefaultsActions-create')

      expect(button).toHaveTextContent('Create')
      expect(button).toHaveAttribute(
        'data-action',
        'job-billing-defaults-action-create'
      )
    })
  })

  describe("when it's `remove` type", () => {
    it('renders component properly', () => {
      const { getByTestId } = render({
        type: 'remove',
        handleOnClick: jest.fn(),
        operation: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      const button = getByTestId('JobBillingDefaultsActions-remove')

      expect(button).toHaveTextContent('Remove')
      expect(button).toHaveAttribute(
        'data-action',
        'job-billing-defaults-action-remove'
      )
    })
  })

  describe("when it's `update` type", () => {
    it('renders component properly', () => {
      const { getByTestId } = render({
        type: 'update',
        handleOnClick: jest.fn(),
        operation: {
          __typename: 'Operation',
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      const button = getByTestId('JobBillingDefaultsActions-update')

      expect(button).toHaveTextContent('Update')
      expect(button).toHaveAttribute(
        'data-action',
        'job-billing-defaults-action-update'
      )
    })
  })
})

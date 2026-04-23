import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrdersListHeader from '.'

const render = (props: ComponentProps<typeof PurchaseOrdersListHeader>) =>
  renderComponent(<PurchaseOrdersListHeader {...props} />)

describe('PurchaseOrdersListHeader', () => {
  describe('when `operation` is defined', () => {
    describe('and its `Disabled`', () => {
      it('renders table header', () => {
        const { queryByTestId, queryByText } = render({
          operation: {
            callable: OperationCallableTypes.DISABLED,
            messages: ['test disabled message']
          },
          handleOnClick: jest.fn()
        })

        expect(queryByText('Add Purchase Order')).toBeInTheDocument()
        expect(
          queryByTestId('PurchaseOrdersListHeader-create')
        ).toBeInTheDocument()
      })
    })

    describe('and its `ENABLED`', () => {
      it('renders table header', () => {
        const { queryByTestId, queryByText } = render({
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          handleOnClick: jest.fn()
        })

        expect(queryByText('Add Purchase Order')).toBeInTheDocument()
        expect(
          queryByTestId('PurchaseOrdersListHeader-create')
        ).toBeInTheDocument()
      })
    })
  })

  describe('when `operation` is undefined', () => {
    it('not rendering the button', () => {
      const { queryByTestId } = render({
        operation: undefined,
        handleOnClick: jest.fn()
      })

      expect(
        queryByTestId('PurchaseOrdersListHeader-create')
      ).not.toBeInTheDocument()
    })
  })
})

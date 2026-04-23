import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import PurchaseOrderLineDetailsTableContent from './PurchaseOrderLineDetailsTableContent'

jest.mock('../../../../data/getPurchaseOrderLineArchiveState.graphql.types')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))

jest.mock('../utils', () => ({
  getPropertyValue: jest.fn(),
  adjustValueForKey: jest.fn()
}))

jest.mock('@staff-portal/ui', () => {
  const { DetailedList } = jest.requireActual('@staff-portal/ui')

  return {
    DetailedList
  }
})
const purchaseOrderLine = fixtures.MockPurchaseOrderLine.data.node

const render = (
  props: ComponentProps<typeof PurchaseOrderLineDetailsTableContent>
) => renderComponent(<PurchaseOrderLineDetailsTableContent {...props} />)
const elementNames = ['expiryDate', 'amount', 'threshold']

describe('PurchaseOrderLineDetailsTableContent', () => {
  it('renders component', () => {
    const { getByTestId, queryByTestId } = render({
      purchaseOrderLine: { ...purchaseOrderLine, expiryDate: '2022-03-21' }
    })

    expect(getByTestId('expiryDate')).toHaveTextContent('March 21, 2022')
    elementNames.forEach(testId => {
      expect(getByTestId(testId)).toBeInTheDocument()
      expect(queryByTestId(`${testId}-disabled`)).toHaveTextContent('false')
    })
  })

  describe('when operations are disabled', () => {
    it('disables editors', () => {
      const { getByTestId, queryByTestId } = render({
        purchaseOrderLine: {
          ...purchaseOrderLine,
          expiryDate: undefined,
          operations: {
            ...purchaseOrderLine.operations,
            updatePurchaseOrderLine: {
              callable: OperationCallableTypes.DISABLED,
              messages: ['']
            }
          }
        }
      })

      expect(getByTestId('expiryDate')).toHaveTextContent(EMPTY_DATA)

      elementNames.forEach(testId => {
        expect(getByTestId(testId)).toBeInTheDocument()
        expect(queryByTestId(`${testId}-disabled`)).toHaveTextContent('true')
      })
    })
  })
})

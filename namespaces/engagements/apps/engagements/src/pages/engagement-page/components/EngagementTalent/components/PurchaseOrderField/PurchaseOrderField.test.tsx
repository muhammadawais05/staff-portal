import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import PurchaseOrderField from './PurchaseOrderField'

const defaultProps = {
  engagementId: '123',
  purchaseOrder: { id: 'PO-1', poNumber: '1', webResource: { url: 'po-url' } },
  purchaseOrderLine: {
    id: 'Line-2',
    poLineNumber: '2',
    webResource: { url: 'line-url' },
    purchaseOrder: {
      id: 'PO-1',
      poNumber: '1',
      webResource: { url: 'po-url' }
    }
  },
  operation: { callable: OperationCallableTypes.ENABLED, messages: [''] },
  poLinesEnabled: false
}

const renderComponent = (
  props: Partial<ComponentProps<typeof PurchaseOrderField>>
) => {
  return render(
    <TestWrapper>
      <PurchaseOrderField {...defaultProps} {...props} />
    </TestWrapper>
  )
}

describe('PurchaseOrderField', () => {
  describe('when the po lines is enabled', () => {
    it('renders po lines fields', () => {
      const { queryByTestId } = renderComponent({ poLinesEnabled: true })

      expect(
        queryByTestId('PurchaseOrderField-po-line-number')
      ).toBeInTheDocument()
    })
  })

  describe('when the po lines is disabled', () => {
    it('hides po lines fields', () => {
      const { queryByTestId } = renderComponent({ poLinesEnabled: false })

      expect(
        queryByTestId('PurchaseOrderField-po-line-number')
      ).not.toBeInTheDocument()
    })
  })
})

import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import PurchaseOrderEditFormSelectFields from './PurchaseOrderEditFormSelectFields'

const mockedChange = jest.fn()
const mockedSubmit = jest.fn()

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: () => ({ change: mockedChange })
}))

const renderComponent = ({
  data = {}
}: ComponentProps<typeof PurchaseOrderEditFormSelectFields>) => {
  return render(
    <TestWrapper>
      <Form data-testid='form' onSubmit={mockedSubmit}>
        <PurchaseOrderEditFormSelectFields data={data} />
      </Form>
    </TestWrapper>
  )
}

const emptyPO = {
  id: 'PO-empty',
  poNumber: '0',
  client: { fullName: 'NO-Lines', id: 'client-0' },
  purchaseOrderLines: { nodes: [] }
}

const poWithLine = {
  id: '123',
  poNumber: '1',
  client: { fullName: 'PO', id: 'po-0' },
  purchaseOrderLines: {
    nodes: [
      {
        id: '2',
        poLineNumber: '2',
        client: { id: '0', fullName: 'Client' }
      }
    ]
  }
}
const poLine = {
  id: '2',
  poLineNumber: '2',
  purchaseOrder: { id: '123', poNumber: '1' }
}

describe('PurchaseOrderEditFormSelectFields', () => {
  describe('when poLinesVisible is true', () => {
    it('displays po line field', () => {
      const { queryByTestId } = renderComponent({
        data: {
          node: {
            id: 'root-1',
            purchaseOrder: null,
            purchaseOrderLine: poLine,
            selectablePurchaseOrders: {
              nodes: [poWithLine]
            }
          }
        }
      })

      fireEvent.change(
        screen
          .getByTestId('purchase-order-edit-modal-orders')
          .querySelector('#purchaseOrderId') as Element,
        {
          target: { value: '1' }
        }
      )

      expect(
        queryByTestId('purchase-order-line-edit-modal-orders')
      ).toBeInTheDocument()
    })
  })

  describe('when poLinesVisible is false', () => {
    it('hides po line field', () => {
      const { queryByTestId } = renderComponent({
        data: {
          node: {
            id: 'root-1',
            purchaseOrder: null,
            purchaseOrderLine: null,
            selectablePurchaseOrders: {
              nodes: [emptyPO]
            }
          }
        }
      })

      expect(
        queryByTestId('purchase-order-edit-modal-orders')
      ).toBeInTheDocument()
      expect(
        queryByTestId('purchase-order-line-edit-modal-orders')
      ).not.toBeInTheDocument()
    })
  })

  describe('when a PO with no PO lines is selected', () => {
    it('clears any previously selected PO lines', () => {
      renderComponent({
        data: {
          node: {
            id: 'root-1',
            purchaseOrder: null,
            purchaseOrderLine: poLine,
            selectablePurchaseOrders: {
              nodes: [emptyPO, poWithLine]
            }
          }
        }
      })

      fireEvent.change(
        screen
          .getByTestId('purchase-order-edit-modal-orders')
          .querySelector('#purchaseOrderId') as Element,
        {
          target: { value: '1' }
        }
      )

      fireEvent.change(
        screen
          .getByTestId('purchase-order-edit-modal-orders')
          .querySelector('#purchaseOrderId') as Element,
        {
          target: { value: '0' }
        }
      )

      expect(mockedChange).toHaveBeenLastCalledWith(
        'purchaseOrderLineId',
        undefined
      )
    })
  })

  describe('when the PO is cleared', () => {
    it('clears any previously selected PO lines', () => {
      renderComponent({
        data: {
          node: {
            id: 'root-1',
            purchaseOrder: null,
            purchaseOrderLine: poLine,
            selectablePurchaseOrders: {
              nodes: [poWithLine]
            }
          }
        }
      })

      fireEvent.change(
        screen
          .getByTestId('purchase-order-edit-modal-orders')
          .querySelector('#purchaseOrderId') as Element,
        {
          target: { value: null }
        }
      )

      expect(mockedChange).toHaveBeenLastCalledWith(
        'purchaseOrderLineId',
        undefined
      )
    })
  })
})

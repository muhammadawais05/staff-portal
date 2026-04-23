import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { fireEvent } from '@testing-library/react'

import PurchaseOrderFields from '.'

const mockedChange = jest.fn()

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: () => ({ change: mockedChange })
}))

const render = ({ invoice }: ComponentProps<typeof PurchaseOrderFields>) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <PurchaseOrderFields invoice={invoice} />
    </Form>
  )

describe('PurchaseOrderFields', () => {
  it('displays purchase order field', () => {
    const { getByTestId } = render({
      invoice: {
        purchaseOrder: { id: '123' },
        subjectObject: {
          purchaseOrdersNullable: {
            nodes: [
              {
                id: 'po-1'
              }
            ]
          }
        }
      }
    })

    expect(getByTestId('purchase-order-edit-select')).toHaveTextContent(
      'Purchase Order'
    )
  })

  describe('when a PO with no PO lines is selected', () => {
    it('clears any previously selected PO lines', () => {
      const { getByTestId } = render({
        invoice: {
          purchaseOrder: { id: '123' },
          subjectObject: {
            purchaseOrdersNullable: {
              nodes: [
                {
                  id: 'po-with-line',
                  poNumber: '1',
                  purchaseOrderLines: { nodes: [{ id: 'line-1' }] }
                },
                {
                  poNumber: '2',
                  id: 'po-no-line'
                }
              ]
            }
          }
        }
      })

      fireEvent.change(
        getByTestId('purchase-order-edit-select').querySelector(
          '#purchaseOrderId'
        ) as Element,
        {
          target: { value: 'po-with-line' }
        }
      )

      fireEvent.change(
        getByTestId('purchase-order-edit-select').querySelector(
          '#purchaseOrderId'
        ) as Element,
        {
          target: { value: 'po-no-line' }
        }
      )

      expect(mockedChange).toHaveBeenLastCalledWith(
        'purchaseOrderLineId',
        undefined
      )
    })
  })
})

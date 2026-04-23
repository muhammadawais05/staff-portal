import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { when } from 'jest-when'

import PurchaseOrderEditForm from './PurchaseOrderEditForm'
import {
  AssignEngagementPurchaseOrderDocument,
  GetEditPurchaseOrderDataDocument
} from '../../data'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const handleSubmitMock = jest.fn()

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(AssignEngagementPurchaseOrderDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          assignEngagementPurchaseOrder: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const mockReturnValues = () => {
  when(mockUseQuery)
    .calledWith(GetEditPurchaseOrderDataDocument, expect.anything())
    .mockImplementation(() => ({
      data: {
        node: {
          selectablePurchaseOrders: { nodes: [] },
          title: 'Product Manager',
          job: { purchaseOrder: { id: '1', poNumber: '123456' } }
        }
      },
      loading: false,
      initialLoading: false
    }))
}

const renderComponent = () => {
  window.Element.prototype.scrollIntoView = jest.fn()
  mockReturnValues()

  return render(
    <TestWrapper>
      <PurchaseOrderEditForm hideModal={jest.fn()} engagementId='1' />
    </TestWrapper>
  )
}

describe('PurchaseOrderEditForm', () => {
  describe('when the job has a purchase order', () => {
    it('shows a purchase order warning', () => {
      useModalFormChangeHandlerMock.mockReturnValue({
        handleSubmit: () => {}
      })

      mockSuccessImplementation()
      renderComponent()

      expect(
        screen.getByTestId('purchase-order-edit-modal-warning')
      ).toBeInTheDocument()
    })

    describe('when filling the form with correct data', () => {
      it('submits the form and shows the success notification', async () => {
        useModalFormChangeHandlerMock.mockReturnValue({
          loading: false,
          handleSubmit: () => {}
        })

        mockSuccessImplementation()
        renderComponent()

        fireEvent.click(
          screen.getByTestId('purchase-order-edit-modal-submit-button')
        )

        expect(
          await screen.findByText('Please complete this field.')
        ).toBeInTheDocument()

        fireEvent.change(screen.getByLabelText(/Comment/), {
          target: { value: 'Some comment' }
        })

        await act(async () => {
          await fireEvent.click(
            screen.getByTestId('purchase-order-edit-modal-submit-button')
          )
        })

        expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
          expect.objectContaining({
            mutationResultOptions: expect.objectContaining({
              successNotificationMessage:
                'The Purchase Order Number was successfully updated.'
            })
          })
        )
      })
    })

    describe('when `Not Selected` option is choosen', () => {
      it('submits the form with `purchaseOrderId` equals `null`', async () => {
        useModalFormChangeHandlerMock.mockReturnValue({
          loading: false,
          handleSubmit: handleSubmitMock
        })

        mockSuccessImplementation()
        renderComponent()

        fireEvent.change(screen.getByLabelText(/Comment/), {
          target: { value: 'Some comment' }
        })

        fireEvent.change(
          screen
            .getByTestId('purchase-order-edit-modal-orders')
            .querySelector('#purchaseOrderId') as Element,
          {
            target: { value: 'Not Selected' }
          }
        )

        await act(async () => {
          await fireEvent.click(
            screen.getByTestId('purchase-order-edit-modal-submit-button')
          )
        })

        expect(handleSubmitMock).toHaveBeenNthCalledWith(1, {
          engagementId: '1',
          comment: 'Some comment',
          purchaseOrderId: null
        })
        expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
          expect.objectContaining({
            mutationResultOptions: expect.objectContaining({
              successNotificationMessage:
                'The Purchase Order Number was successfully updated.'
            })
          })
        )
      })
    })
  })
})

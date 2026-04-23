import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { when } from 'jest-when'

import PurchaseOrderEditForm from './PurchaseOrderLineEditForm'
import {
  AssignEngagementPurchaseOrderLineDocument,
  GetEditPurchaseOrderDataDocument
} from '../../data'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const handleSubmitMock = jest.fn()

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(AssignEngagementPurchaseOrderLineDocument, expect.anything())
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
          job: { purchaseOrderLine: { id: '1', poLineNumber: '123456' } }
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

describe('PurchaseOrderLineEditForm', () => {
  describe('when the job has a purchase order line', () => {
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

    describe('when filling the form with missing data', () => {
      it('renders validation errors', async () => {
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
            target: { value: null }
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
          purchaseOrderLineId: null
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

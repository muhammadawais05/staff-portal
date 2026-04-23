import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { ModalSuspender } from '@staff-portal/modals-service'

import { useGetClientPurchaseOrders } from '../../data'
import IssueInvoiceModalContent from './IssueInvoiceModalContent'

jest.mock('@staff-portal/billing-widgets', () => ({
  PurchaseOrderLineSelect: () => null
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('../../data', () => ({
  useGetClientPurchaseOrders: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: jest.fn()
}))

const renderComponent = (
  props: ComponentProps<typeof IssueInvoiceModalContent>
) =>
  render(
    <TestWrapper>
      <IssueInvoiceModalContent {...props} />
    </TestWrapper>
  )

const mockedUseGetClientPurchaseOrders = useGetClientPurchaseOrders as jest.Mock
const mockedUseModalFormChangeHandler = useModalFormChangeHandler as jest.Mock
const mockedModalSuspender = ModalSuspender as unknown as jest.Mock

describe('IssueInvoiceModalContent', () => {
  const data = {}
  const purchaseOrdersLoading = true
  const loading = false
  const handleSubmit = () => null
  const modalTitle = 'modalTitle'
  const clientId = 'clientId'
  const companyName = 'companyName'
  const hideModal = () => null
  const mutationResultName = 'mutationResultName'
  const mutationDocument = {} as DocumentNode
  const successNotificationMessage = 'successNotificationMessage'

  beforeEach(() => {
    mockedUseGetClientPurchaseOrders.mockReturnValueOnce({
      data,
      loading: purchaseOrdersLoading
    })
    mockedModalSuspender.mockReturnValueOnce(null)
  })

  describe('when showSendNotifications is passed', () => {
    it('renders all the fields', () => {
      mockedUseModalFormChangeHandler.mockReturnValueOnce({
        handleSubmit,
        loading
      })

      const showSendNotifications = true

      const { getByTestId } = renderComponent({
        modalTitle,
        clientId,
        companyName,
        hideModal,
        mutationResultName,
        mutationDocument,
        successNotificationMessage,
        showSendNotifications
      })

      expect(
        getByTestId('issue-invoice-modal-send-notifications')
      ).toBeInTheDocument()
      expect(useGetClientPurchaseOrders).toHaveBeenCalledTimes(1)
      expect(useGetClientPurchaseOrders).toHaveBeenCalledWith(clientId)
      expect(mockedUseModalFormChangeHandler).toHaveBeenCalledTimes(1)
      expect(mockedUseModalFormChangeHandler).toHaveBeenCalledWith({
        mutationDocument,
        mutationResultOptions: {
          isFormSubmit: true,
          mutationResult: mutationResultName,
          onSuccessAction: hideModal,
          successNotificationMessage
        }
      })
      expect(mockedModalSuspender).toHaveBeenCalledTimes(0)
    })
  })

  describe('when showSendNotifications is not passed', () => {
    it('renders all the fields', () => {
      mockedUseModalFormChangeHandler.mockReturnValueOnce({
        handleSubmit,
        loading
      })

      const showSendNotifications = false

      const { queryByTestId } = renderComponent({
        modalTitle,
        clientId,
        companyName,
        hideModal,
        mutationResultName,
        mutationDocument,
        successNotificationMessage,
        showSendNotifications
      })

      expect(
        queryByTestId('issue-invoice-modal-send-notifications')
      ).not.toBeInTheDocument()
    })
  })

  describe('when loading or data does not exist', () => {
    it('renders modal suspender', () => {
      mockedUseModalFormChangeHandler.mockReturnValueOnce({
        handleSubmit,
        loading: true
      })

      const showSendNotifications = false

      const { queryByTestId } = renderComponent({
        modalTitle,
        clientId,
        companyName,
        hideModal,
        mutationResultName,
        mutationDocument,
        successNotificationMessage,
        showSendNotifications
      })

      expect(queryByTestId('issue-invoice-modal-form')).not.toBeInTheDocument()
      expect(mockedModalSuspender).toHaveBeenCalledTimes(1)
    })
  })
})

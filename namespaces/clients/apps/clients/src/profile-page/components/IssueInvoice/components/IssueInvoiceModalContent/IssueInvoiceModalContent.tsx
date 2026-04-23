import React from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button, ReferralBonus16 } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { CreateClientDepositInvoiceInput } from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { PurchaseOrderLineSelect } from '@staff-portal/billing-widgets'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { getBillingTermsOptions } from '../../utils'
import { useGetClientPurchaseOrders } from '../../data'

export interface Props {
  modalTitle: string
  hideModal: () => void
  clientId: string
  companyName: string
  mutationResultName: string
  mutationDocument: DocumentNode
  successNotificationMessage: string
  showSendNotifications?: boolean
}

const IssueInvoiceModalContent = ({
  modalTitle,
  clientId,
  companyName,
  hideModal,
  mutationResultName,
  mutationDocument,
  successNotificationMessage,
  showSendNotifications
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: mutationDocument,
    mutationResultOptions: {
      mutationResult: mutationResultName,
      onSuccessAction: hideModal,
      isFormSubmit: true,
      successNotificationMessage: successNotificationMessage
    }
  })
  const { data, loading: purchaseOrdersLoading } =
    useGetClientPurchaseOrders(clientId)

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <Form<CreateClientDepositInvoiceInput>
      initialValues={{
        clientId,
        duePeriod: data?.netTerms
      }}
      data-testid='issue-invoice-modal-form'
      onSubmit={handleSubmit}
    >
      <Modal.Title>{modalTitle}</Modal.Title>
      <Modal.Content>
        <PurchaseOrderLineSelect
          width='auto'
          data={data?.purchaseOrdersNullable}
          poPlaceholder={NOT_SELECTED_PLACEHOLDER}
          poLabel='Purchase order'
          poLinePlaceholder={NOT_SELECTED_PLACEHOLDER}
          poLineLabel='Line Number'
          loading={purchaseOrdersLoading}
        />
        <Form.NumberInput
          label='Amount'
          name='amount'
          width='auto'
          required
          icon={<ReferralBonus16 />}
          data-testid='issue-invoice-modal-amount'
        />
        <Form.Select
          label='Billing terms'
          name='duePeriod'
          required
          width='auto'
          options={getBillingTermsOptions(data?.availableNetTerms ?? [])}
        />
        <Form.Input
          label='Description'
          name='comment'
          required
          width='full'
          multiline
          rows={4}
        />
        {showSendNotifications && (
          <Form.Checkbox
            label={`Send the notification to ${companyName}`}
            name='sendNotifications'
            data-testid='issue-invoice-modal-send-notifications'
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>
          Issue an Invoice
        </Form.SubmitButton>
      </Modal.Actions>
    </Form>
  )
}

export default IssueInvoiceModalContent

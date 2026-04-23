import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Alert, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useCallback } from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { FormCancelButton } from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'
import { ENGAGEMENT_TALENT_UPDATED } from '@staff-portal/engagements'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import PurchaseOrderLineEditFormSelectFields from '../PurchaseOrderEditFormSelectFields'
import {
  AssignEngagementPurchaseOrderLineDocument,
  GetEditPurchaseOrderDataDocument
} from '../../data'

type PurchaseOrderLineEditFormValues = {
  purchaseOrderId?: string
  purchaseOrderLineId?: string
  comment: string
}

export type Props = {
  engagementId: string
  hideModal: () => void
}

const PurchaseOrderLineEditForm = ({ engagementId, hideModal }: Props) => {
  const { data, loading } = useQuery(GetEditPurchaseOrderDataDocument, {
    variables: { engagementId }
  })
  const { handleSubmit: handleMutationSubmit } = useModalFormChangeHandler({
    mutationDocument: AssignEngagementPurchaseOrderLineDocument,
    mutationResultOptions: {
      successNotificationMessage:
        'The Purchase Order Number was successfully updated.',
      successMessageEmitOptions: {
        type: ENGAGEMENT_TALENT_UPDATED,
        payload: { engagementId }
      },
      isFormSubmit: true,
      onSuccessAction: hideModal
    }
  })

  const handleSubmit = useCallback(
    ({ comment, purchaseOrderLineId }: PurchaseOrderLineEditFormValues) =>
      handleMutationSubmit({
        engagementId,
        purchaseOrderLineId: purchaseOrderLineId ?? null,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, engagementId]
  )

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <ModalForm<PurchaseOrderLineEditFormValues>
      title='Update Purchase Order Line'
      initialValues={{
        purchaseOrderId: data?.node?.purchaseOrderLine?.purchaseOrder?.id,
        purchaseOrderLineId: data?.node?.purchaseOrderLine?.id
      }}
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        {!!data?.node?.job?.purchaseOrderLine && (
          <Container
            bottom='medium'
            data-testid='purchase-order-edit-modal-warning'
          >
            <Alert>
              <Typography>
                The job {data.node.job.title} is already assigned to PO Line{' '}
                {data?.node?.job?.purchaseOrderLine?.poLineNumber}.
              </Typography>

              <Typography>
                Updating this engagement-level PO Line will override the
                job-level setting.
              </Typography>
            </Alert>
          </Container>
        )}

        <PurchaseOrderLineEditFormSelectFields data={data} />
        <Form.Input
          label='Comment'
          name='comment'
          required
          width='full'
          multiline
          rows={4}
          validate={isMaxLength}
          data-testid='purchase-order-edit-modal-comment'
        />
      </Modal.Content>
      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />
        <Form.SubmitButton
          data-testid='purchase-order-edit-modal-submit-button'
          variant='positive'
        >
          Update
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default PurchaseOrderLineEditForm

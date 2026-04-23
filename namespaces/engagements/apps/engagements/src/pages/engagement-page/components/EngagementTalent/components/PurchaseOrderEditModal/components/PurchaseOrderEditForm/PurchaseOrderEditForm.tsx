import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Alert, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useMemo, useCallback } from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { FormCancelButton } from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'
import { ENGAGEMENT_TALENT_UPDATED } from '@staff-portal/engagements'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

import {
  AssignEngagementPurchaseOrderDocument,
  GetEditPurchaseOrderDataDocument
} from '../../data'
import { getSelectablePurchaseOrderOption } from '../../utils'

type PurchaseOrderEditFormValues = {
  purchaseOrderId?: string
  comment: string
}

export type Props = {
  engagementId: string
  hideModal: () => void
}

const PurchaseOrderEditForm = ({ engagementId, hideModal }: Props) => {
  const { data, loading } = useQuery(GetEditPurchaseOrderDataDocument, {
    variables: { engagementId }
  })

  const options = useMemo(() => {
    const result =
      data?.node?.selectablePurchaseOrders?.nodes.map(order =>
        getSelectablePurchaseOrderOption({
          order,
          currentOrderId: data.node?.purchaseOrder?.id
        })
      ) ?? []

    return [NOT_SELECTED_OPTION, ...result]
  }, [
    data?.node?.purchaseOrder?.id,
    data?.node?.selectablePurchaseOrders?.nodes
  ])

  const { handleSubmit: handleMutationSubmit } = useModalFormChangeHandler({
    mutationDocument: AssignEngagementPurchaseOrderDocument,
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
    ({ comment, purchaseOrderId }: PurchaseOrderEditFormValues) =>
      handleMutationSubmit({
        engagementId,
        purchaseOrderId: purchaseOrderId ?? null,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, engagementId]
  )

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <ModalForm<PurchaseOrderEditFormValues>
      title='Update Purchase Order Number'
      initialValues={{ purchaseOrderId: data?.node?.purchaseOrder?.id }}
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        {!!data?.node?.job?.purchaseOrder && (
          <Container
            bottom='medium'
            data-testid='purchase-order-edit-modal-warning'
          >
            <Alert>
              <Typography>
                The job {data.node.job.title} is already assigned to{' '}
                {data.node.job.purchaseOrder.poNumber}.
              </Typography>

              <Typography>
                Updating this engagement-level PO will override the job-level
                setting.
              </Typography>
            </Alert>
          </Container>
        )}

        <Form.Select
          autoFocus
          name='purchaseOrderId'
          options={options}
          data-testid='purchase-order-edit-modal-orders'
        />

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

export default PurchaseOrderEditForm

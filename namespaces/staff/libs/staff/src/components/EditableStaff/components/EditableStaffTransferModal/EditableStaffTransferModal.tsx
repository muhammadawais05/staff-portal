import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  RequestClientClaimerTransferInput,
  RoleV2Scope
} from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { ContainerLoader, ModalSkeleton } from '@staff-portal/ui'

import { useGetStaffRoles } from '../../../../utils'
import { useRequestTransfer } from '../../hooks'

type EditableStaffTransferModalProps = {
  hideModal: () => void
  clientId: string
  fieldName: string
  mutationDocument: DocumentNode
  mutationName: string
  scope: RoleV2Scope
}

const TITLE = 'Request Transfer'

const EditableStaffTransferModal = ({
  hideModal,
  clientId,
  fieldName,
  mutationDocument,
  mutationName,
  scope
}: EditableStaffTransferModalProps) => {
  const { handleSubmit, submitting } = useRequestTransfer({
    hideModal,
    mutationName,
    mutationDocument
  })
  const { options, initialLoading, loading } = useGetStaffRoles(scope)

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      data-testid='RequestTransfer-modal'
    >
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={TITLE} />}
      >
        <Form<RequestClientClaimerTransferInput>
          initialValues={{
            clientId,
            requestedTransferId: options?.length ? options[0].value : ''
          }}
          onSubmit={handleSubmit}
        >
          <Modal.Title>{TITLE}</Modal.Title>
          <Modal.Content>
            <Container bottom='medium'>
              <Typography size='medium'>
                {`You are requesting to transfer this lead to another ${fieldName}. You will be responsible for this lead until the
                transfer has been approved.`}
              </Typography>
            </Container>
            <Form.Select
              label='Requested transfer'
              name='requestedTransferId'
              width='full'
              options={options}
              data-testid='EditableStaffTransferModal-select'
            />
            <Form.Input
              label='Comment'
              name='comment'
              required
              width='full'
              multiline
              rows={4}
              data-testid='EditableStaffTransferModal-comment'
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              variant='secondary'
              disabled={submitting}
              onClick={hideModal}
            >
              Cancel
            </Button>
            <Form.SubmitButton
              variant='positive'
              data-testid='EditableStaffTransferModal-submit'
            >
              Request Transfer
            </Form.SubmitButton>
          </Modal.Actions>
        </Form>
      </ContainerLoader>
    </Modal>
  )
}

export default EditableStaffTransferModal

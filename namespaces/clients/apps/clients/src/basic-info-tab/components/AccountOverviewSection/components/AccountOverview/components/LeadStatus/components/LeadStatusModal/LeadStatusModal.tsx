import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { UpdateClientEnterpriseLeadStatusInput } from '@staff-portal/graphql/staff'
import { ContainerLoader, ModalSkeleton } from '@staff-portal/ui'
import { stringListToOptions } from '@staff-portal/string'

import useUpdateLeadStatus from '../../hooks/use-update-lead-status'
import { GetClientLeadStatusModalDataQuery } from '../../../../data/get-client-lead-status-modal-data.staff.gql.types'

export type LeadStatusModalProps = {
  hideModal: () => void
  startPolling: () => void
  clientId: string
  data: GetClientLeadStatusModalDataQuery
  initialLoading: boolean
}

const TITLE = 'Update Lead Status'

const LeadStatusModal = ({
  hideModal,
  clientId,
  initialLoading,
  data: {
    node,
    clientEnterpriseFollowUpStatuses,
    clientEnterpriseLeadStatuses
  },
  startPolling
}: LeadStatusModalProps) => {
  const { handleSubmit, loading } = useUpdateLeadStatus(() => {
    startPolling()
    hideModal()
  })
  const { enterpriseFollowUpStatus, enterpriseLeadStatus } = node ?? {}

  return (
    <Modal withForm open onClose={hideModal} data-testid='LeadStatusModal'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={TITLE} />}
        data-testid='LeadStatusModal-loader'
      >
        <Form<UpdateClientEnterpriseLeadStatusInput>
          initialValues={{
            clientId,
            enterpriseFollowUpStatus: enterpriseFollowUpStatus ?? '',
            enterpriseLeadStatus: enterpriseLeadStatus ?? '',
            comment: ''
          }}
          data-testid='LeadStatusModal-form'
          onSubmit={handleSubmit}
        >
          <Modal.Title>{TITLE}</Modal.Title>
          <Modal.Content>
            <Form.Select
              label='Status'
              name='enterpriseLeadStatus'
              required
              enableReset
              width='full'
              options={stringListToOptions(clientEnterpriseLeadStatuses)}
              data-testid='LeadStatusModal-status'
            />
            <Form.Select
              label='Next Action'
              name='enterpriseFollowUpStatus'
              required
              enableReset
              width='full'
              options={stringListToOptions(clientEnterpriseFollowUpStatuses)}
              data-testid='LeadStatusModal-nextAction'
            />

            <Form.Input
              label='Comment'
              name='comment'
              required
              width='full'
              multiline
              rows={4}
              data-testid='LeadStatusModal-comment'
            />
          </Modal.Content>
          <Modal.Actions>
            <Button variant='secondary' disabled={loading} onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton
              variant='positive'
              data-testid='LeadStatusModal-submit'
            >
              Confirm
            </Form.SubmitButton>
          </Modal.Actions>
        </Form>
      </ContainerLoader>
    </Modal>
  )
}

export default LeadStatusModal

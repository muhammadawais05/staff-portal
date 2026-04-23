import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { SalesOwnerRelationship } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'

import { JobDetailsStaffFragment } from '../../../../data/get-job-company-data.staff.gql.types'
import EditSalesOwnerModalContent from '../EditSalesOwnerModalContent'

type Props = {
  hideModal: () => void
  currentSalesOwner?: {
    owner?: JobDetailsStaffFragment
    relationship?: SalesOwnerRelationship
  } | null
  jobId: string
}

export const MODAL_TITLE = 'Reassign Sales Owner'

const EditSalesOwnerModal = ({
  hideModal,
  currentSalesOwner,
  jobId
}: Props) => (
  <Modal
    withForm
    open
    defaultTitle={MODAL_TITLE}
    onClose={hideModal}
    operationVariables={{
      nodeId: jobId,
      nodeType: NodeType.JOB,
      operationName: 'updateJobSalesOwner'
    }}
    data-testid='edit-sales-owner-modal'
  >
    <EditSalesOwnerModalContent
      jobId={jobId}
      hideModal={hideModal}
      currentSalesOwner={currentSalesOwner}
    />
  </Modal>
)

export default EditSalesOwnerModal

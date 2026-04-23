import React from 'react'
import { lazy } from '@staff-portal/utils'
import { NodeType } from '@staff-portal/graphql'
import { Modal } from '@staff-portal/modals-service'
import { GetLazyOperationVariables } from '@staff-portal/operations'

const AssignToJobModalContent = lazy(
  () => import('./components/AssignToJobModalContent/AssignToJobModalContent')
)

interface Props {
  hideModal: () => void
  companyRepresentativeId: string
}

const AssignToJobModal = ({ hideModal, companyRepresentativeId }: Props) => {
  const lazyOperationVariables: GetLazyOperationVariables = {
    nodeId: companyRepresentativeId,
    nodeType: NodeType.COMPANY_REPRESENTATIVE,
    operationName: 'assignCompanyRepresentativeToJob'
  }

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={lazyOperationVariables}
      defaultTitle='Assign this Contact to Job'
    >
      <AssignToJobModalContent
        companyRepresentativeId={companyRepresentativeId}
        hideModal={hideModal}
      />
    </Modal>
  )
}

export default AssignToJobModal

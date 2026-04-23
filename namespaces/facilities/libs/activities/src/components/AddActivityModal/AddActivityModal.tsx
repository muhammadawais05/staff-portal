import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { ActivityType } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'
import { GetLazyOperationVariables } from '@staff-portal/operations'

import AddActivityModalClientContent from '../AddActivityModalClientContent'
import AddActivityModalTalentContent from '../AddActivityModalTalentContent'
import AddActivityModalTaskContent from '../AddActivityModalTaskContent'
import AddActivityModalJobContent from '../AddActivityModalJobContent'

export const MODAL_TITLE = 'Add Activity'

const getNodeType = (type?: ActivityType) => {
  switch (type) {
    case ActivityType.CLIENT_RELATED:
      return NodeType.CLIENT
    case ActivityType.TALENT_RELATED:
      return NodeType.TALENT
    case ActivityType.JOB_RELATED:
      return NodeType.JOB
    default:
      return NodeType.TASK
  }
}

type Props = {
  subjectId: string
  type?: ActivityType
  hideModal: () => void
}

const ModalContent = ({ type, ...props }: Props) => {
  switch (type) {
    case ActivityType.CLIENT_RELATED:
      return <AddActivityModalClientContent {...props} />
    case ActivityType.TALENT_RELATED:
      return <AddActivityModalTalentContent {...props} />
    case ActivityType.JOB_RELATED:
      return <AddActivityModalJobContent {...props} />
  }

  return <AddActivityModalTaskContent {...props} />
}

const AddActivityModal = ({ subjectId, type, hideModal }: Props) => {
  const operationVariables: GetLazyOperationVariables = {
    nodeId: subjectId,
    nodeType: getNodeType(type),
    operationName: 'createActivity'
  }

  return (
    <Modal
      operationVariables={operationVariables}
      defaultTitle={MODAL_TITLE}
      onClose={hideModal}
      size='small'
      open
    >
      <ModalContent subjectId={subjectId} type={type} hideModal={hideModal} />
    </Modal>
  )
}

export default AddActivityModal

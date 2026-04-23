import React from 'react'
import {
  NegotiationStatus,
  UpdateNegotiationStatusInput
} from '@staff-portal/graphql/staff'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

export type UpdateNegotiationForm = Omit<
  UpdateNegotiationStatusInput,
  'negotiationId'
>

export interface Props {
  companyName: string
  negotiationId: string
  negotiationStatus: NegotiationStatus
  hideModal: () => void
}

const UpdateNegotiationStatusForm = lazy(
  () =>
    import(
      './components/UpdateNegotiationStatusForm/UpdateNegotiationStatusForm'
    )
)

const UpdateNegotiationStatusModal = ({
  companyName,
  negotiationId,
  negotiationStatus,
  hideModal
}: Props) => {
  return (
    <Modal
      open
      onClose={hideModal}
      defaultTitle={`Update Negotiations Status of ${companyName}`}
      data-testid='UpdateNegotiationStatusModal'
      operationVariables={{
        nodeId: negotiationId,
        nodeType: NodeType.NEGOTIATION,
        operationName: 'updateNegotiationStatus'
      }}
    >
      <UpdateNegotiationStatusForm
        hideModal={hideModal}
        companyName={companyName}
        negotiationId={negotiationId}
        negotiationStatus={negotiationStatus}
      />
    </Modal>
  )
}

export default UpdateNegotiationStatusModal

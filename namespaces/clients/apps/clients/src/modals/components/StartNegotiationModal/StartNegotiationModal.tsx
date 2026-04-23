import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { StartNegotiationInput } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

export type StartNegotiationForm = Omit<StartNegotiationInput, 'clientId'>

export interface Props {
  companyId: string
  companyName: string
  hideModal: () => void
}

const StartNegotiationForm = lazy(
  () => import('./components/StartNegotiationForm/StartNegotiationForm')
)

const StartNegotiationModal = ({
  companyId,
  companyName,
  hideModal
}: Props) => (
  <Modal
    withForm
    onClose={hideModal}
    open
    operationVariables={{
      nodeId: companyId,
      nodeType: NodeType.CLIENT,
      operationName: 'negotiationStartForClient'
    }}
    defaultTitle={`Start Negotiations with ${companyName}`}
    data-testid='StartNegotiationModal'
  >
    <StartNegotiationForm
      companyId={companyId}
      companyName={companyName}
      hideModal={hideModal}
    />
  </Modal>
)

export default StartNegotiationModal

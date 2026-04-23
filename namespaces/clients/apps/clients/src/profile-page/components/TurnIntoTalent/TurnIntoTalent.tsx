import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

import { TITLE } from './components'


export interface Props {
  hideModal: () => void
  companyId: string
  fullName: string
}

const TurnIntoTalentModalContent = lazy(
  () =>
    import('./components/TurnIntoTalentModalContent/TurnIntoTalentModalContent')
)

const TurnIntoTalent = ({ companyId, fullName, hideModal }: Props) => (
  <Modal
    open
    onClose={hideModal}
    data-testid='TurnIntoTalent'
    defaultTitle={TITLE}
    operationVariables={{
      nodeId: companyId,
      nodeType: NodeType.CLIENT,
      operationName: 'convertClientToTalent'
    }}
  >
    <TurnIntoTalentModalContent
      companyId={companyId}
      fullName={fullName}
      hideModal={hideModal}
    />
  </Modal>
)

export default TurnIntoTalent

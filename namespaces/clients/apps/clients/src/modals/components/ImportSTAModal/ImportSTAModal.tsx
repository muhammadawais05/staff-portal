import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

interface Props {
  companyId: string
  hideModal: () => void
}

const ImportSTAForm = lazy(
  () => import('./components/ImportSTAForm/ImportSTAForm')
)

const ImportSTAModal = ({ companyId, hideModal }: Props) => (
  <Modal
    onClose={hideModal}
    open
    size='small'
    data-testid='ImportSTAModal'
    defaultTitle='Import STA'
    operationVariables={{
      nodeId: companyId,
      nodeType: NodeType.CLIENT,
      operationName: 'importSTA'
    }}
  >
    <ImportSTAForm companyId={companyId} hideModal={hideModal} />
  </Modal>
)

export default ImportSTAModal

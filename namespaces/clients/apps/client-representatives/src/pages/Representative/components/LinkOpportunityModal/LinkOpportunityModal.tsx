import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { LinkOpportunityContent } from '../LinkOpportunityContent'

interface Props {
  representativeId: string
  hideModal: () => void
}

export const LinkOpportunityModal = ({
  hideModal,
  representativeId
}: Props) => (
  <Modal
    onClose={hideModal}
    open
    size='small'
    defaultTitle='Link opportunity'
    operationVariables={{
      nodeId: representativeId,
      nodeType: NodeType.COMPANY_REPRESENTATIVE,
      operationName: 'linkOpportunityCompanyRepresentative'
    }}
  >
    <LinkOpportunityContent
      representativeId={representativeId}
      hideModal={hideModal}
    />
  </Modal>
)

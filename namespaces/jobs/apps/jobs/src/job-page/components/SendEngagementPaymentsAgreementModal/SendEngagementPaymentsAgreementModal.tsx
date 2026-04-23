import { NodeType } from '@staff-portal/graphql'
import { Modal } from '@staff-portal/modals-service'
import React from 'react'

import { SendEngagementPaymentsAgreementModalContent } from './components'

type Props = {
  engagementId: string
  hideModal: () => void
}

const SendEngagementPaymentsAgreementModal = ({
  engagementId,
  hideModal
}: Props) => (
  <Modal
    operationVariables={{
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'sendSemiMonthlyEngagementPaymentsAgreement'
    }}
    onClose={hideModal}
    open
    size='small'
  >
    <SendEngagementPaymentsAgreementModalContent
      engagementId={engagementId}
      hideModal={hideModal}
    />
  </Modal>
)

export default SendEngagementPaymentsAgreementModal

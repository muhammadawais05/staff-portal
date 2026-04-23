import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import SendEngagementPaymentsAgreementModal from '../SendEngagementPaymentsAgreementModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const SendPaymentsAgreementItem = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(SendEngagementPaymentsAgreementModal, {
    engagementId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='send-payments-agreement'
          onClick={showModal}
          disabled={disabled}
        >
          Send Payments Agreement
        </Menu.Item>
      )}
    />
  )
}

export default SendPaymentsAgreementItem

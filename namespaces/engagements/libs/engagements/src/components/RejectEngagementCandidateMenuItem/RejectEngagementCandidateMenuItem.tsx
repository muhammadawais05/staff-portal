import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import RejectEngagementCandidateModal from '../RejectEngagementCandidateModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const RejectEngagementCandidateMenuItem = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(RejectEngagementCandidateModal, {
    engagementId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='reject-candidate'
          onClick={showModal}
          disabled={disabled}
        >
          Reject Candidate
        </Menu.Item>
      )}
    />
  )
}

export default RejectEngagementCandidateMenuItem

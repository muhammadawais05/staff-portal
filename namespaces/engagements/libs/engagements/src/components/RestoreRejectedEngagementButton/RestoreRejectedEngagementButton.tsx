import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import RestoreRejectedEngagementModal from '../RestoreRejectedEngagementModal'

export interface Props {
  engagementId: string
  operation: OperationType
}

const RestoreRejectedEngagementButton = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(RestoreRejectedEngagementModal, {
    engagementId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          disabled={disabled}
          variant='secondary'
          onClick={showModal}
          data-testid='RestoreRejectedEngagement-button'
        >
          Restore Rejected Interview
        </Button>
      )}
    />
  )
}

export default RestoreRejectedEngagementButton

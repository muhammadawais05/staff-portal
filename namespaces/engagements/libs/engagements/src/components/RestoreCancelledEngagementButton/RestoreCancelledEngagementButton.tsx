import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import RestoreCancelledEngagementModal from '../RestoreCancelledEngagementModal'

export interface Props {
  engagementId: string
  operation: OperationType
}

const RestoreCancelledEngagementButton = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(RestoreCancelledEngagementModal, {
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
          data-testid='RestoreCancelledEngagement-button'
        >
          Restore Cancelled Interview
        </Button>
      )}
    />
  )
}

export default RestoreCancelledEngagementButton

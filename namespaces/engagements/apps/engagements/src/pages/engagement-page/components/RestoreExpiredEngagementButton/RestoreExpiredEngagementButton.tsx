import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import RestoreExpiredEngagementModal from '../RestoreExpiredEngagementModal'
export interface Props {
  engagementId: string
  operation: OperationType
}

const RestoreExpiredEngagementButton = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(RestoreExpiredEngagementModal, {
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
          data-testid='RestoreExpiredEngagement-button'
        >
          Restore Expired Interview
        </Button>
      )}
    />
  )
}

export default RestoreExpiredEngagementButton

import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import PostponeExpirationModal from '../PostponeExpirationModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const PostponeExpirationButton = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(PostponeExpirationModal, { engagementId })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='positive'
          disabled={disabled}
          onClick={showModal}
          data-testid='postpone-expiration-button'
        >
          Postpone Expiration
        </Button>
      )}
    />
  )
}

export default PostponeExpirationButton

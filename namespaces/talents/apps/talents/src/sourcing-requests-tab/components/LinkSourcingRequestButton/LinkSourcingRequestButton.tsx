import { Button, SkeletonLoader } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import React from 'react'
import { Operation, OperationType } from '@staff-portal/operations'

import LinkSourcingRequestModal from '../LinkSourcingRequestModal'

interface LinkSourcingRequestButtonProps {
  talentId: string
  refetch: () => void
  operation?: OperationType
  loading: boolean
}

const LinkSourcingRequestButton = ({
  talentId,
  refetch,
  operation,
  loading
}: LinkSourcingRequestButtonProps) => {
  const { showModal } = useModal(LinkSourcingRequestModal, {
    talentId,
    onLink: refetch
  })

  if (loading) {
    return <SkeletonLoader.Button size='small' />
  }

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='primary'
          onClick={showModal}
          disabled={disabled}
        >
          Link Sourcing Request
        </Button>
      )}
    />
  )
}

export default LinkSourcingRequestButton

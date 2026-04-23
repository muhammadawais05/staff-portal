import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ReopenEngagementAndApproveTrialModal from '../ReopenEngagementAndApproveTrialModal'

export type Props = {
  engagementId: string
  operation: OperationType
}

const ReopenEngagementAndApproveTrialButton = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(ReopenEngagementAndApproveTrialModal, {
    engagementId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Container right='xsmall'>
          <Button
            disabled={disabled}
            onClick={showModal}
            size='small'
            variant='secondary'
            data-testid='reopen-engagement'
          >
            Reopen Engagement and Approve Trial
          </Button>
        </Container>
      )}
    />
  )
}

export default ReopenEngagementAndApproveTrialButton

import React from 'react'
import { Button } from '@toptal/picasso'
import { isOperationDisabled, Operation } from '@staff-portal/operations'
import { Operation as OperationType } from '@staff-portal/graphql/staff'

import { useCloneJobModal } from '../CloneJobModal/hooks'

type Props = {
  jobId: string
  initialOperation: OperationType | undefined
}

const CloneJobButton = ({ jobId, initialOperation }: Props) => {
  const { showModal } = useCloneJobModal({
    jobId
  })

  return (
    <Operation operation={initialOperation}>
      <Button
        variant='secondary'
        size='small'
        disabled={isOperationDisabled(initialOperation)}
        onClick={showModal}
      >
        Clone
      </Button>
    </Operation>
  )
}

export default CloneJobButton

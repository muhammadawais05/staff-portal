import React from 'react'
import { Button } from '@toptal/picasso'
import { NodeType } from '@staff-portal/graphql'
import { Operation, OperationType } from '@staff-portal/operations'

import { useTrackOnlineTestModal } from '../TalentTrackOnlineTestAttemptModal/hooks'

export interface Props {
  talentId: string
  onlineTestAttemptId: string
  operation: OperationType
  nodeType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
}

const TalentTrackOnlineTestAttemptButton = ({
  talentId,
  onlineTestAttemptId,
  operation,
  nodeType
}: Props) => {
  const { showModal } = useTrackOnlineTestModal({
    talentId,
    onlineTestAttemptId,
    nodeType
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          size='small'
          variant='secondary'
          onClick={showModal}
        >
          Track
        </Button>
      )}
    />
  )
}

export default TalentTrackOnlineTestAttemptButton

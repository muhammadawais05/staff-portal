import React from 'react'
import { Button, Reset16, Tooltip } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { useNewOnlineTestAttemptModal } from '../TalentSendNewOnlineTestAttemptModal/hooks'

export interface Props {
  talentId: string
  onlineTestAttemptId: string
  operation: OperationType
  nodeType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
}

const TalentSendNewOnlineTestAttemptButton = ({
  talentId,
  onlineTestAttemptId,
  nodeType,
  operation
}: Props) => {
  const { showModal } = useNewOnlineTestAttemptModal({
    talentId,
    onlineTestAttemptId,
    nodeType
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Tooltip content='Send New Test'>
          <span>
            <Button
              disabled={disabled}
              size='small'
              variant='secondary'
              icon={<Reset16 />}
              onClick={showModal}
            >
              Test
            </Button>
          </span>
        </Tooltip>
      )}
    />
  )
}

export default TalentSendNewOnlineTestAttemptButton

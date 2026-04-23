import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { TalentCancelOnlineTestModal } from '../TalentCancelOnlineTestModal'

export interface Props {
  talentId: string
  testId: string
  testName: string
  nodeType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
  operation: OperationType
}

const TalentCancelOnlineTestButton = ({
  talentId,
  testId,
  testName,
  nodeType,
  operation
}: Props) => {
  const { showModal } = useModal(TalentCancelOnlineTestModal, {
    talentId,
    testId,
    testName,
    testType: nodeType
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          size='small'
          variant='negative'
          onClick={showModal}
        >
          Cancel
        </Button>
      )}
    />
  )
}

export default TalentCancelOnlineTestButton

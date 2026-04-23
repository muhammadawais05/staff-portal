import { Button } from '@toptal/picasso'
import React from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { Operation } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import ApproveModal from '../ApproveModal/ApproveModal'

interface Props {
  operationalIssueId: string
  operation: Operation
}

const ApproveButton = ({ operationalIssueId, operation }: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  const renderOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: operationalIssueId,
      nodeType: NodeType.OPERATIONAL_ISSUE,
      operationName: 'approveOperationalIssue'
    },
    onSuccess: () => {
      showModal()
    }
  })

  return (
    <>
      {renderOperation(({ disabled, loading, checkOperation }) => (
        <Button
          size='small'
          variant='positive'
          disabled={disabled}
          onClick={checkOperation}
          loading={loading}
        >
          Approve
        </Button>
      ))}
      {isOpen && (
        <ApproveModal
          onClose={hideModal}
          operationalIssueId={operationalIssueId}
        />
      )}
    </>
  )
}

export default ApproveButton

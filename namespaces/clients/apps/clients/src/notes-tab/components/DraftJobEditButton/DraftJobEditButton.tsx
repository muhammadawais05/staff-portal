import React from 'react'
import { Button, Pencil16 } from '@toptal/picasso'
import {
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  useRenderLazyOperation,
  OperationFragment
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

export type Props = {
  draftJobId: string
  operation: OperationFragment
  onClick: () => void
}

const DraftJobEditButton = ({ draftJobId, operation, onClick }: Props) => {
  const renderLazyOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: draftJobId,
      nodeType: NodeType.DRAFT_JOB,
      operationName: 'updateSalesDraftJob'
    },
    onSuccess: onClick
  })

  return renderLazyOperation(({ disabled, loading, checkOperation }) => (
    <Button.Circular
      disabled={disabled}
      variant='flat'
      icon={<Pencil16 />}
      onClick={checkOperation}
      loading={loading}
      aria-label='Edit Draft Job'
    />
  ))
}

export default DraftJobEditButton

import React from 'react'
import { Button } from '@toptal/picasso'
import {
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  useRenderLazyOperation,
  OperationFragment
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

export type Props = {
  companyId: string
  disabled?: boolean
  operation: OperationFragment
  onClick: () => void
}

const DraftJobCreateButton = ({
  companyId,
  disabled,
  operation,
  onClick
}: Props) => {
  const renderLazyOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: companyId,
      nodeType: NodeType.CLIENT,
      operationName: 'createSalesDraftJob'
    },
    onSuccess: onClick
  })

  return renderLazyOperation(
    ({ disabled: operationDisabled, loading, checkOperation }) => (
      <Button
        size='small'
        disabled={disabled || operationDisabled}
        onClick={checkOperation}
        loading={loading}
      >
        Log Draft Job
      </Button>
    )
  )
}

export default DraftJobCreateButton

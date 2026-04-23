import React from 'react'
import { Button, Pencil16 } from '@toptal/picasso'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { OperationType, useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

type Props = {
  representativeId: string
  operation?: OperationType | null
  onClick: () => void
}

const EditButton = ({ representativeId, operation, onClick }: Props) => {
  const renderLazyOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: representativeId,
      nodeType: NodeType.COMPANY_REPRESENTATIVE,
      operationName: 'updateCompanyRepresentativeProfile'
    },
    onSuccess: onClick
  })

  return renderLazyOperation(({ disabled, loading, checkOperation }) => (
    <Button.Circular
      disabled={disabled}
      loading={loading}
      onClick={checkOperation}
      variant='flat'
      icon={<Pencil16 />}
      aria-label='Edit Contact'
    />
  ))
}

export default EditButton

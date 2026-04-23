import React from 'react'
import { Button } from '@toptal/picasso'
import { useNavigate } from '@staff-portal/navigation'
import { getCreateCompanyRepresentativePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { OperationType, useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

type Props = {
  companyId: string
  operation: OperationType
}

const AddContactButton = ({ companyId, operation }: Props) => {
  const navigate = useNavigate()

  const renderLazyOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: companyId,
      nodeType: NodeType.CLIENT,
      operationName: 'createCompanyRepresentative'
    },
    onSuccess: () => {
      const decodedClientId = decodeEntityId(companyId).id
      const path = getCreateCompanyRepresentativePath(decodedClientId)

      navigate(path)
    }
  })

  return renderLazyOperation(({ disabled, loading, checkOperation }) => (
    <Button
      size='small'
      disabled={disabled}
      onClick={checkOperation}
      loading={loading}
    >
      Add Contact
    </Button>
  ))
}

export default AddContactButton

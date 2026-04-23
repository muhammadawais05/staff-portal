import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { ClientEnterpriseAccountStatusEnum } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import EnterpriseAccountStatusView from '../EnterpriseAccountStatusView'
import { useRestoreEnterpriseAccountStatusModal } from '../../hooks'
import { CompanyEnterpriseAccountStatusFragment } from '../../../../../../data'

export type Props = {
  status: ClientEnterpriseAccountStatusEnum
  clientId: string
  operation: CompanyEnterpriseAccountStatusFragment['operations']['restoreClientEnterpriseAccountStatus']
}

const EnterpriseAccountStatusRestore = ({
  operation,
  clientId,
  status
}: Props) => {
  const { showModal } = useRestoreEnterpriseAccountStatusModal(clientId)
  const renderOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: clientId,
      nodeType: NodeType.CLIENT,
      operationName: 'restoreClientEnterpriseAccountStatus'
    },
    onSuccess: showModal
  })

  return (
    <Container flex justifyContent='space-between'>
      <Container>
        <EnterpriseAccountStatusView status={status} />
      </Container>
      <Container>
        {renderOperation(({ checkOperation, loading, disabled }) => (
          <Button
            disabled={disabled}
            variant='secondary'
            onClick={checkOperation}
            loading={loading}
            size='small'
          >
            Restore
          </Button>
        ))}
      </Container>
    </Container>
  )
}

export default EnterpriseAccountStatusRestore

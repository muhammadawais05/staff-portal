import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { CompanyOverviewFragment } from '../../../../data'
import useUpdateLeadStatusModal from './hooks/use-update-lead-status-modal'
import { getRenderEditButton } from './utils'

export type Props = {
  clientId: string
  operation: CompanyOperationFragment
  value: CompanyOverviewFragment['enterpriseLeadStatus']
}

const LeadStatus = ({ clientId, value, operation }: Props) => {
  const { loading, showModal } = useUpdateLeadStatusModal(clientId)

  const renderOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: clientId,
      nodeType: NodeType.CLIENT,
      operationName: 'updateClientEnterpriseLeadStatus'
    },
    onSuccess: () => {
      showModal()
    }
  })

  return (
    <Container flex justifyContent={value ? 'space-between' : 'flex-end'}>
      {value && (
        <TypographyOverflow size='medium' data-testid='LeadStatus-value'>
          {value}
        </TypographyOverflow>
      )}
      {renderOperation(getRenderEditButton(loading))}
    </Container>
  )
}

export default LeadStatus

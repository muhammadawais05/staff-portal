import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useActionLoading } from '@staff-portal/utils'

import { useMarkAsBadLeadModal } from '../MarkAsBadLeadModal'

export interface Props {
  clientId: string
  operation: OperationType
  title?: string
}

const MarkAsBadLeadModalButton = ({ clientId, operation }: Props) => {
  const { showModal } = useMarkAsBadLeadModal({ clientId })
  const { actionsLoading } = useActionLoading(`company-${clientId}`)

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          titleCase={false}
          onClick={showModal}
          disabled={disabled || actionsLoading}
        >
          Bad Lead
        </Button>
      )}
    />
  )
}

export default MarkAsBadLeadModalButton

import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useActionLoading } from '@staff-portal/utils'

import { useCheckClientComplianceModal } from './services/use-check-client-compliance-modal'

export interface Props {
  clientId: string
  clientName: string
  operation?: OperationType
  onComplete?: () => void
}

const CheckComplianceButton = ({ clientId, operation, onComplete }: Props) => {
  const { actionsLoading } = useActionLoading(`company-${clientId}`)
  const { showModal } = useCheckClientComplianceModal({
    clientId,
    onComplete
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          onClick={showModal}
          disabled={disabled || actionsLoading}
          data-testid='check-client-compliance-button'
        >
          Check Compliance
        </Button>
      )}
    />
  )
}

export default CheckComplianceButton

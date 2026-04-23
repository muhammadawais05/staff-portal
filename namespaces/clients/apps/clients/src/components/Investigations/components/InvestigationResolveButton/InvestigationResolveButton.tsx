import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { Operation as OperationType } from '@staff-portal/graphql/staff'

import { InvestigationResolveModal } from '../../components'
import { InvestigationAvailableReason } from '../../../../config'

interface Props {
  operation?: OperationType
  clientId: string
  investigationReason: InvestigationAvailableReason
}

const InvestigationResolveButton = ({
  operation,
  clientId,
  investigationReason
}: Props) => {
  const { showModal } = useModal(InvestigationResolveModal, {
    clientId,
    investigationReason
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='positive'
          data-testid='investigation-resolve-button'
          disabled={disabled}
          onClick={showModal}
        >
          Resolve Investigation
        </Button>
      )}
    />
  )
}

export default InvestigationResolveButton

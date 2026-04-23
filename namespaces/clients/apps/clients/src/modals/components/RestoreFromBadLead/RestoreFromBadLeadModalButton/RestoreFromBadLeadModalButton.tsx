import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useActionLoading } from '@staff-portal/utils'

import RestoreFromBadLeadModal from '../RestoreFromBadLeadModal'

export interface Props {
  clientId: string
  clientName: string
  operation: OperationType
}

const RestoreFromBadLeadModalButton = ({
  clientId,
  clientName,
  operation
}: Props) => {
  const { showModal } = useModal(RestoreFromBadLeadModal, {
    clientId,
    clientName
  })
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
          Restore From Bad Lead
        </Button>
      )}
    />
  )
}

export default RestoreFromBadLeadModalButton

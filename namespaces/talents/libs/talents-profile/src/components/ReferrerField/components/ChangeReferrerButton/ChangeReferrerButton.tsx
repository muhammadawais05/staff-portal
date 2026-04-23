import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ChangeReferrerModal from '../ChangeReferrerModal'

interface Props {
  roleId: string
  roleHasReferrer: boolean
  canIssueSourcingCommission?: boolean | null
  operation: OperationType
}

const ChangeReferrerButton = ({
  roleId,
  roleHasReferrer,
  canIssueSourcingCommission,
  operation
}: Props) => {
  const { showModal } = useModal(ChangeReferrerModal, {
    roleId,
    roleHasReferrer,
    canIssueSourcingCommission: !!canIssueSourcingCommission
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
          data-testid='change-referrer-button'
        >
          Change
        </Button>
      )}
    />
  )
}

export default ChangeReferrerButton

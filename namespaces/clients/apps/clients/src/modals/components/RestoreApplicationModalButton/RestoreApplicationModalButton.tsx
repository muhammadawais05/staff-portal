import { Button } from '@toptal/picasso'
import React from 'react'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useActionLoading } from '@staff-portal/utils'

import RestoreApplicationModal from '../RestoreApplicationModal'

export interface Props {
  title?: string
  companyId: string
  operation: OperationType
}

const RestoreApplicationModalButton = ({
  title = 'Restore',
  companyId,
  operation
}: Props) => {
  const { showModal } = useModal(RestoreApplicationModal, { companyId })

  const { actionsLoading } = useActionLoading(`company-${companyId}`)

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          data-testid='restore-application'
          variant='secondary'
          size='small'
          titleCase={false}
          onClick={showModal}
          disabled={disabled || actionsLoading}
        >
          {title}
        </Button>
      )}
    />
  )
}

export default RestoreApplicationModalButton

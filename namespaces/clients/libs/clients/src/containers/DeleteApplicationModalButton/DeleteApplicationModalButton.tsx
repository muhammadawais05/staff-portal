import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useActionLoading } from '@staff-portal/utils'

import { useDeleteApplicationModal } from '../DeleteApplicationModal'

export interface Props {
  clientId: string
  operation: OperationType
}

const DeleteApplicationModalButton = ({ clientId, operation }: Props) => {
  const { showModal } = useDeleteApplicationModal({
    clientId
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
          Delete
        </Button>
      )}
    />
  )
}

export default DeleteApplicationModalButton

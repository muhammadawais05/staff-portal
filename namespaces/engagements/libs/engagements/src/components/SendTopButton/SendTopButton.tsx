import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { isOperationEnabled, Operation } from '@staff-portal/operations'

import { SendTopModal } from '../SendTopModal'

export type Props = {
  engagementId: string
  operation: OperationType
  clientHasStaSigned: boolean
}

const SendTopButton = ({
  engagementId,
  operation,
  clientHasStaSigned
}: Props) => {
  const { showModal } = useModal(SendTopModal, {
    engagementId
  })

  const clientDoesNotHaveStaSigned =
    isOperationEnabled(operation) && !clientHasStaSigned

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled || clientDoesNotHaveStaSigned}
          onClick={showModal}
          size='small'
          variant='secondary'
          data-testid='send-top'
        >
          Send TOP
        </Button>
      )}
    />
  )
}

export default SendTopButton

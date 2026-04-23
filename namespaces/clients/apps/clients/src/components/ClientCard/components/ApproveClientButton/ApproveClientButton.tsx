import React from 'react'
import { Button } from '@toptal/picasso'
import { Maybe, Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import useClientApproveModal from '../../../../notes-tab/components/ClientApproveModal/hooks/use-client-approve-modal'

type Props = {
  clientId: string
  operation?: Maybe<OperationType>
}

export const ApproveClientButton = ({ clientId, operation }: Props) => {
  const { showModal } = useClientApproveModal({
    clientId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          variant='secondary'
          size='small'
          onClick={showModal}
        >
          Approve
        </Button>
      )}
    />
  )
}

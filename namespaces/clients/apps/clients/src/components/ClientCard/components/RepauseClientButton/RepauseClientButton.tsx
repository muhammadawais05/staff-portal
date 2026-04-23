import React from 'react'
import { Button } from '@toptal/picasso'
import { Maybe, Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useRepauseCompanyModal } from '@staff-portal/clients'

type Props = {
  clientId: string
  operation?: Maybe<OperationType>
}

export const RepauseClientButton = ({ clientId, operation }: Props) => {
  const { showModal } = useRepauseCompanyModal({
    companyId: clientId
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
          Repause
        </Button>
      )}
    />
  )
}

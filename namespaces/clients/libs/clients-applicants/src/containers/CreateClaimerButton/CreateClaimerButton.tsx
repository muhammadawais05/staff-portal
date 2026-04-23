import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useActionLoading } from '@staff-portal/utils'

import { useCreateClaimerModal } from './services'

export interface Props {
  companyId: string
  operation: OperationType
  buttonTitle?: string
}

const CreateClaimerButton = ({
  companyId,
  operation,
  buttonTitle = 'Claim'
}: Props) => {
  const { showModal } = useCreateClaimerModal(companyId)
  const { actionsLoading } = useActionLoading(`company-${companyId}`)

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='primary'
          size='small'
          titleCase={false}
          onClick={showModal}
          disabled={disabled || actionsLoading}
          data-testid='create-claimer-button'
        >
          {buttonTitle}
        </Button>
      )}
    />
  )
}

export default CreateClaimerButton

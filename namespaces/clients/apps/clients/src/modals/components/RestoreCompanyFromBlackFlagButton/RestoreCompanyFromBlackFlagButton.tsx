import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation } from '@staff-portal/operations'

import RestoreCompanyFromBlackFlagModal from '../RestoreCompanyFromBlackFlagModal'

type Props = {
  companyId: string
  operation?: OperationType
}

const RestoreCompanyFromBlackFlagButton = ({ companyId, operation }: Props) => {
  const { showModal } = useModal(RestoreCompanyFromBlackFlagModal, {
    companyId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          variant='secondary'
          size='small'
          data-testid='restore-company-from-black-flag-button'
          onClick={showModal}
        >
          Restore From Black Flag
        </Button>
      )}
    />
  )
}

export default RestoreCompanyFromBlackFlagButton

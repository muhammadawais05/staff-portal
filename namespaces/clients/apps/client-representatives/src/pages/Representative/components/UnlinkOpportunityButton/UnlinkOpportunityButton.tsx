import React from 'react'
import { Operation, OperationType } from '@staff-portal/operations'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import UnlinkOpportunityModal from '../UnlinkOpportunityModal/UnlinkOpportunityModal'

interface Props {
  opportunityId: string
  representativeId: string
  operation?: OperationType
}

const UnlinkOpportunityButton = ({
  operation,
  opportunityId,
  representativeId
}: Props) => {
  const { showModal } = useModal(UnlinkOpportunityModal, {
    opportunityId,
    representativeId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showModal}
        >
          Unlink
        </Button>
      )}
    />
  )
}

export default UnlinkOpportunityButton

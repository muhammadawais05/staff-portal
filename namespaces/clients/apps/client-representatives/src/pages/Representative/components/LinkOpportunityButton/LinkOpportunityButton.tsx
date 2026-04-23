import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import { LinkOpportunityModal } from '../LinkOpportunityModal'

interface Props {
  operation: OperationType
  representativeId: string
}

export const LinkOpportunityButton = ({
  operation,
  representativeId
}: Props) => {
  const { showModal } = useModal(LinkOpportunityModal, {
    representativeId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
        >
          Link Opportunity
        </Button>
      )}
    />
  )
}

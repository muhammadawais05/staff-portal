import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import { Operations } from '../../types'
import { InvestigationCreateModal } from '../../components'

interface Props {
  operation?: Operations['createClientInvestigation']
  clientId: string
}

const InvestigationStartButton = ({ operation, clientId }: Props) => {
  const { showModal } = useModal(InvestigationCreateModal, { clientId })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='negative'
          data-testid='investigation-start-button'
          disabled={disabled}
          onClick={showModal}
        >
          Start Investigation
        </Button>
      )}
    />
  )
}

export default InvestigationStartButton

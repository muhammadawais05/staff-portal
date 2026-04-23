import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import { Operations } from '../../types'
import { InvestigationUpdateModal } from '../../components'

interface Props {
  operation?: Operations['updateClientInvestigation']
  clientId: string
}

const InvestigationUpdateButton = ({ operation, clientId }: Props) => {
  const { showModal } = useModal(InvestigationUpdateModal, { clientId })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='positive'
          data-testid='investigation-update-button'
          disabled={disabled}
          onClick={showModal}
        >
          Update Investigation
        </Button>
      )}
    />
  )
}

export default InvestigationUpdateButton

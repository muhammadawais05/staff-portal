import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { ImportTopModal } from '../ImportTopModal'

export type Props = {
  engagementId: string
  operation: OperationType
}

const ImportTopButton = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(ImportTopModal, { engagementId })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          onClick={showModal}
          size='small'
          variant='secondary'
          data-testid='import-top'
        >
          Import TOP
        </Button>
      )}
    />
  )
}

export default ImportTopButton

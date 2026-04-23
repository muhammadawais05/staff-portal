import React from 'react'
import { Button, Plus16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { OperationFragment, Operation } from '@staff-portal/operations'

import AssignToJobModal from '../AssignToJobModal/AssignToJobModal'

type Props = {
  operation: OperationFragment
  companyRepresentativeId: string
}

const AssignToJobButton = ({ operation, companyRepresentativeId }: Props) => {
  const { showModal } = useModal(AssignToJobModal, {
    companyRepresentativeId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
          icon={<Plus16 />}
        >
          Assign to Job
        </Button>
      )}
    />
  )
}

export default AssignToJobButton

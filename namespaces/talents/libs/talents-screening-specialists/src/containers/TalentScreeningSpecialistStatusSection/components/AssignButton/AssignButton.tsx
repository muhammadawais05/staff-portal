import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import { SpecialistAssignmentFragment } from '../../../../data/specialist-assignment-fragment.staff.gql.types'
import AssignModal from '../AssignModal'

export interface Props {
  talentId: string
  assignment?: SpecialistAssignmentFragment | null
  operation: OperationType
}

const AssignButton = ({
  talentId,
  assignment: initialAssignment,
  operation
}: Props) => {
  const { showModal } = useModal(AssignModal, {
    talentId,
    initialAssignment
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          data-testid='tss-assign-button'
          variant='secondary'
          size='small'
          onClick={showModal}
          disabled={disabled}
        >
          Assign
        </Button>
      )}
    />
  )
}

export default AssignButton

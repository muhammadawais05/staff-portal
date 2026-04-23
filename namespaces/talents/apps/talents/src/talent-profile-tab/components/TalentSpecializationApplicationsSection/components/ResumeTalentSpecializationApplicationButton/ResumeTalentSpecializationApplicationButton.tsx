import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import ResumeTalentSpecializationApplicationModal from '../ResumeTalentSpecializationApplicationModal'

export interface Props {
  talentId: string
  talentName: string
  specializationId: string
  specializationTitle: string
  operation: OperationType
}

const ResumeTalentSpecializationApplicationButton = ({
  talentId,
  talentName,
  specializationId,
  specializationTitle,
  operation
}: Props) => {
  const { showModal } = useModal(ResumeTalentSpecializationApplicationModal, {
    talentId,
    talentName,
    specializationId,
    specializationTitle
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
          data-testid='resume-talent-specialization-application-button'
        >
          Resume
        </Button>
      )}
    />
  )
}

export default ResumeTalentSpecializationApplicationButton

import React from 'react'
import { Button, Trash16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import RemoveTalentSoftSkillRatingModal from '../RemoveTalentSoftSkillRatingModal'

export interface Props {
  ratingId: string
  talentId: string
  softSkillName: string
  talentName: string
  operation: OperationType
}

const RemoveTalentSoftSkillRatingButton = ({
  ratingId,
  softSkillName,
  talentName,
  talentId,
  operation
}: Props) => {
  const { showModal } = useModal(RemoveTalentSoftSkillRatingModal, {
    ratingId,
    talentId,
    softSkillName,
    talentName
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button.Circular
          disabled={disabled}
          variant='flat'
          icon={<Trash16 />}
          onClick={showModal}
          title='remove rating'
          data-testid='remove-soft-skill-rating-button'
        />
      )}
    />
  )
}

export default RemoveTalentSoftSkillRatingButton

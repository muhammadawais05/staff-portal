import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import { TalentSoftSkills } from '../../../../types'
import CreateTalentSoftSkillRatingModal from '../CreateTalentSoftSkillRatingModal'

export interface Props {
  talentId: string
  talentName: string
  softSkill: TalentSoftSkills
  operation: OperationType
}

const CreateTalentSoftSkillRatingButton = ({
  talentId,
  talentName,
  softSkill,
  operation
}: Props) => {
  const { showModal } = useModal(CreateTalentSoftSkillRatingModal, {
    talentId,
    talentName,
    softSkill
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          data-testid='create-soft-skill-rating-button'
          onClick={showModal}
          disabled={disabled}
        >
          Rate
        </Button>
      )}
    />
  )
}

export default CreateTalentSoftSkillRatingButton

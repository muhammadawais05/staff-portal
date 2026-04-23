import {
  NewEngagementWizardAttributes,
  TalentPitchInput
} from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { Button } from '@toptal/picasso'
import React from 'react'

import TalentCardBuilderModal from '../TalentCardBuilderModal/TalentCardBuilderModal'

interface Props {
  talentId: string
  attributes: NewEngagementWizardAttributes
  buildTalentPitchOperation?: OperationType
  onComplete: (pitchData: TalentPitchInput) => void
}

const TalentCardBuilderButton = ({
  attributes,
  talentId,
  buildTalentPitchOperation,
  onComplete
}: Props) => {
  const { showModal } = useModal(TalentCardBuilderModal, {
    talentId,
    attributes,
    onComplete
  })

  return (
    <Operation
      operation={buildTalentPitchOperation}
      render={disabled => (
        <Button
          size='small'
          disabled={disabled}
          variant='secondary'
          onClick={showModal}
        >
          Build Talent Card
        </Button>
      )}
    />
  )
}

export default TalentCardBuilderButton

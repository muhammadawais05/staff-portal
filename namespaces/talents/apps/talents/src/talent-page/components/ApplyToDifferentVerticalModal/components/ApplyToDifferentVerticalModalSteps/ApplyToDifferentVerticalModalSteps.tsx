import { Container } from '@toptal/picasso'
import React from 'react'

import { TalentCompletedStepsFragment } from '../../data/get-apply-to-different-vertical-steps'
import {
  PROFILE_STEPS,
  PROFILE_WIZARD_STEPS,
  SCREENING_STEPS
} from '../../constants'
import ApplyToDifferentVerticalModalStepsColumn from '../ApplyToDifferentVerticalModalStepsColumn'

interface Props {
  steps: TalentCompletedStepsFragment
}

const ApplyToDifferentVerticalModalSteps = ({ steps }: Props) => {
  return (
    <Container
      flex
      direction='row'
      justifyContent='flex-start'
      data-testid='apply-to-different-vertical-steps'
    >
      <ApplyToDifferentVerticalModalStepsColumn
        label='Screening'
        name='screeningSteps'
        steps={SCREENING_STEPS}
        selectedSteps={steps.completedScreeningSteps}
      />
      <ApplyToDifferentVerticalModalStepsColumn
        label='Profile Wizard'
        name='profileWizardSteps'
        steps={PROFILE_WIZARD_STEPS}
        selectedSteps={steps.completedProfileWizardSteps}
        centralAlignment={true}
      />
      <ApplyToDifferentVerticalModalStepsColumn
        label='Other Fields'
        name='profileFields'
        steps={PROFILE_STEPS}
        selectedSteps={steps.completedProfileFields}
        centralAlignment={true}
      />
    </Container>
  )
}

export default ApplyToDifferentVerticalModalSteps

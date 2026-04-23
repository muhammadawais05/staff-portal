import React, { useMemo } from 'react'
import { Stepper } from '@toptal/picasso'
import { Maybe, NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import { getStepNames } from './utils'

export interface Props {
  steps: NewEngagementWizardStep[]
  currentStep?: Maybe<NewEngagementWizardStep>
  roleName: string
}

const NewEngagementWizard = ({ steps, currentStep, roleName }: Props) => {
  const stepNames = useMemo(
    () => getStepNames(steps, roleName),
    [roleName, steps]
  )
  const activeStepIndex = useMemo(
    () => steps?.findIndex(step => step === currentStep),
    [steps, currentStep]
  )

  return (
    <Stepper
      active={activeStepIndex}
      steps={stepNames}
      data-testid='new-engagement-wizard'
    />
  )
}

export default NewEngagementWizard

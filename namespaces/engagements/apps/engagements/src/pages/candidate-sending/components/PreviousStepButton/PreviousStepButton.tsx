import React, { useMemo } from 'react'
import { Button } from '@toptal/picasso'

import { useCandidateSendingContext } from '../../hooks'
import { PERSISTED_ENGAGEMENT_INITIAL_STEP } from '../../config'

export type Props = {
  loading: boolean
  disabled: boolean
  onClick: () => Promise<void>
}

const PreviousStepButton = ({ disabled, loading, onClick }: Props) => {
  const {
    actualSteps,
    previousStep,
    queryParametersEngagementId,
    currentStep
  } = useCandidateSendingContext()

  const shouldHideForPersistedEngagement = useMemo(() => {
    if (!queryParametersEngagementId || !currentStep) {
      return false
    }

    const indexOfCurrentStep = actualSteps.indexOf(currentStep)
    const indexOfPersistedEngagementInitialStep = actualSteps.indexOf(
      PERSISTED_ENGAGEMENT_INITIAL_STEP
    )

    return indexOfCurrentStep <= indexOfPersistedEngagementInitialStep
  }, [actualSteps, currentStep, queryParametersEngagementId])

  if (!previousStep) {
    return null
  }

  if (shouldHideForPersistedEngagement) {
    return null
  }

  return (
    <Button
      data-testid='previous-step-button'
      variant='secondary'
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      Back
    </Button>
  )
}

export default PreviousStepButton

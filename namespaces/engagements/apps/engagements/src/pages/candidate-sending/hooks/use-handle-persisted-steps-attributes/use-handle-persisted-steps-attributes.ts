import { useCallback, useMemo, useState } from 'react'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import {
  CandidateSendingPersistedStepsAttributesByStep,
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../types'
import { CANDIDATE_SENDING_STEPS_CONFIG } from '../../config'

const useHandlePersistedStepsAttributes = ({
  currentStep
}: {
  currentStep: NewEngagementWizardStep | null
}) => {
  const [persistedStepsAttributesByStep, setPersistedStepsAttributesByStep] =
    useState<CandidateSendingPersistedStepsAttributesByStep>({})

  const persistedStepAttributesForCurrentStep = useMemo(
    () =>
      currentStep
        ? persistedStepsAttributesByStep[
            currentStep as keyof CandidateSendingStepsAttributesByStep
          ] ?? null
        : null,
    [currentStep, persistedStepsAttributesByStep]
  )

  const setPersistedStepAttributes = useCallback(
    <TStep extends keyof CandidateSendingStepsAttributesByStep>(
      step: TStep,
      stepAttributes: CandidateSendingStepAttributes<TStep>
    ) => {
      const isPersistedStep =
        !!CANDIDATE_SENDING_STEPS_CONFIG[currentStep as NewEngagementWizardStep]
          ?.persistForm

      if (!isPersistedStep) {
        return
      }

      const updatedPersistedStepsAttributes = {
        ...persistedStepsAttributesByStep,
        [step]: stepAttributes
      }

      setPersistedStepsAttributesByStep(updatedPersistedStepsAttributes)
    },
    [
      currentStep,
      persistedStepsAttributesByStep,
      setPersistedStepsAttributesByStep
    ]
  )

  return {
    persistedStepAttributesForCurrentStep,
    setPersistedStepAttributes
  }
}

export default useHandlePersistedStepsAttributes

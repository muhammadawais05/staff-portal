import { useCallback, useMemo, useState } from 'react'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import {
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../types'
import { getStepsAttributes } from '../../containers/CandidateSendingProvider/utils'

const useHandleStepsAttributes = ({
  currentStep,
  initialStepsAttributesByStep
}: {
  currentStep: NewEngagementWizardStep | null
  initialStepsAttributesByStep: CandidateSendingStepsAttributesByStep
}) => {
  const [stepsAttributesByStep, setStepsAttributesByStep] =
    useState<CandidateSendingStepsAttributesByStep>(
      initialStepsAttributesByStep
    )

  const stepAttributesForCurrentStep = useMemo(
    () =>
      currentStep
        ? stepsAttributesByStep[
            currentStep as keyof CandidateSendingStepsAttributesByStep
          ] ?? null
        : null,
    [currentStep, stepsAttributesByStep]
  )

  const stepsAttributes = useMemo(
    () => getStepsAttributes(stepsAttributesByStep),
    [stepsAttributesByStep]
  )

  const setStepAttributes = useCallback(
    <TStep extends keyof CandidateSendingStepsAttributesByStep>(
      step: TStep,
      stepAttributes: CandidateSendingStepAttributes<TStep>
    ) => {
      const updatedStepsAttributes = {
        ...stepsAttributesByStep,
        [step]: stepAttributes
      }

      setStepsAttributesByStep(updatedStepsAttributes)

      return getStepsAttributes(updatedStepsAttributes)
    },
    [stepsAttributesByStep, setStepsAttributesByStep]
  )

  return {
    stepsAttributes,
    stepsAttributesByStep,
    stepAttributesForCurrentStep,
    setStepAttributes
  }
}

export default useHandleStepsAttributes

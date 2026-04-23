import { useCallback, useEffect, useMemo, useState } from 'react'
import { Maybe, NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import getNextStep from '../../utils/get-next-step'
import getPreviousStep from '../../utils/get-previous-step'
import { CandidateSendingStepDirection } from '../../enums'

const useHandleCandidateSendingSteps = ({
  initialSteps,
  initialActualSteps,
  initialStep
}: {
  initialSteps?: NewEngagementWizardStep[]
  initialActualSteps?: NewEngagementWizardStep[]
  initialStep?: Maybe<NewEngagementWizardStep>
}) => {
  const [actualSteps, setActualSteps] = useState<NewEngagementWizardStep[]>([])
  const [currentStep, setCurrentStep] =
    useState<NewEngagementWizardStep | null>(null)
  const [direction, setDirection] = useState<CandidateSendingStepDirection>(
    CandidateSendingStepDirection.Initial
  )

  const shouldUpdateDisplayedSteps = !!initialSteps
  // We should memoize initial non-nullable initial steps and don't update a value even if later BE value is changed
  const displayedSteps = useMemo(
    () => initialSteps,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shouldUpdateDisplayedSteps]
  )

  useEffect(() => {
    if (initialStep) {
      setCurrentStep(initialStep)
    }

    if (initialActualSteps?.length) {
      setActualSteps(initialActualSteps)
    }
  }, [initialActualSteps, initialStep])

  const previousStep = useMemo(
    () => getPreviousStep(displayedSteps, currentStep),
    [displayedSteps, currentStep]
  )
  const nextStep = useMemo(() => {
    return getNextStep(displayedSteps, currentStep)
  }, [displayedSteps, currentStep])

  const handleGoToNextStep = useCallback(
    (newActualSteps: NewEngagementWizardStep[]) => {
      const newNextStep = getNextStep(newActualSteps, currentStep)

      setActualSteps(newActualSteps)
      setCurrentStep(newNextStep)
      setDirection(CandidateSendingStepDirection.Forward)
    },
    [currentStep]
  )
  const handleGoToPreviousStep = useCallback(
    (newActualSteps: NewEngagementWizardStep[]) => {
      const newPreviousStep = getPreviousStep(newActualSteps, currentStep)

      const isInitialStep =
        !!newPreviousStep && !getPreviousStep(newActualSteps, newPreviousStep)

      setActualSteps(newActualSteps)
      setCurrentStep(newPreviousStep)
      setDirection(CandidateSendingStepDirection.Backward)

      return {
        isInitialStep
      }
    },
    [currentStep]
  )

  return {
    displayedSteps,
    actualSteps,

    direction,
    previousStep,
    currentStep,
    nextStep,

    setCurrentStep,

    handleGoToNextStep,
    handleGoToPreviousStep
  }
}

export default useHandleCandidateSendingSteps

import { useCallback, useLayoutEffect, useState } from 'react'

import { JOB_CREATE_WIZARD_STEPS_MAPPING } from '../config'

export const useJobCreateWizard = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [activeStepIndex])

  return {
    goToNextStep: useCallback(
      () => setActiveStepIndex(step => step + 1),
      [setActiveStepIndex]
    ),
    goToPreviousStep: useCallback(
      () => setActiveStepIndex(step => step - 1),
      [setActiveStepIndex]
    ),
    isFirstStep: activeStepIndex === 0,
    isLastStep: activeStepIndex === JOB_CREATE_WIZARD_STEPS_MAPPING.length - 1,
    activeStepIndex,
    activeStepTitle: JOB_CREATE_WIZARD_STEPS_MAPPING[activeStepIndex],
    nextStepTitle: JOB_CREATE_WIZARD_STEPS_MAPPING[activeStepIndex + 1]
  }
}

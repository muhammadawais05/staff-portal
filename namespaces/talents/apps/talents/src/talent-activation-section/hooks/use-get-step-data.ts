import { ActivationStepFragment } from '@staff-portal/talents'

import {
  getStepName,
  isCurrentStep,
  getShowCalendarIcon,
  getNeedsToptalEmail
} from '../utils'
import { useIsStepAssignedToViewer } from './use-is-step-assigned-to-viewer'

interface Options {
  currentUserId: string
  isProfileCreationStepFinished: boolean
}

export const useGetStepData = (
  step: ActivationStepFragment,
  { currentUserId, isProfileCreationStepFinished }: Options
) => {
  const isAssignedToViewer = useIsStepAssignedToViewer(step)

  return {
    isAssignedToViewer,
    stepId: step.id,
    stepName: getStepName(step.type),
    isCurrentStep: isCurrentStep(step),
    showCalendarIcon: getShowCalendarIcon(step, isProfileCreationStepFinished),
    needsToptalEmail: getNeedsToptalEmail(step),
    otherAssignee:
      step.staff?.id && currentUserId !== step.staff?.id
        ? step.staff
        : undefined
  }
}

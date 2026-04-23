import { RoleStepStatus } from '@staff-portal/graphql/staff'
import { CurrentUser } from '@staff-portal/current-user'
import { StepIndicatorColor } from '@staff-portal/ui'
import { ClaimerFragment } from '@staff-portal/facilities'

import {
  ScreeningStepFragment,
  ScreeningRoleStepsFragment
} from '../data/get-talent-screening-role-steps'

export const getStepData = (step: ScreeningStepFragment) => ({
  stepName: step.title
})

export const getTalentScreeningData = (talent: ScreeningRoleStepsFragment) => ({
  talentFullName: talent.fullName,
  screeningRoleSteps: talent.screeningRoleSteps?.nodes
})

export const getIndicatorColor = (
  status: string,
  isStepAssignedToViewer: boolean
): StepIndicatorColor => {
  if (status.toUpperCase() === RoleStepStatus.APPROVED) {
    return StepIndicatorColor.Green
  }

  if (status.toUpperCase() === RoleStepStatus.CLAIMED) {
    return isStepAssignedToViewer
      ? StepIndicatorColor.Yellow
      : StepIndicatorColor.Blue
  }

  return StepIndicatorColor.LightGrey
}

export const getClaimRoleStepMessage = ({
  stepTitle,
  talentFullName,
  talentPartnerFullName
}: {
  stepTitle: string
  talentFullName: string
  talentPartnerFullName?: string
}) => {
  const additionalMessage = talentPartnerFullName
    ? ` (the candidate from the talent partner ${talentPartnerFullName})`
    : ''

  return `Are you sure you want to claim the ${stepTitle} step for ${talentFullName}${additionalMessage}?`
}

export const getClaimerName = (
  currentUser?: CurrentUser,
  selectedClaimer?: ClaimerFragment
): string =>
  (selectedClaimer?.id !== currentUser?.id
    ? selectedClaimer?.fullName
    : 'you') || 'you'

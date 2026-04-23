import {
  ScreeningRoleStepFragment,
  ScreeningRoleStepsFragment,
  ScreeningSectionVisibilityFragment
} from '../../../data/get-talent-screening-role-steps'

const ALLOWED_STATUSES = ['APPLIED', 'PENDING_PROFILE']

export const checkTalentScreeningSectionVisibility = (
  screeningRoleSteps: ScreeningRoleStepFragment[] | undefined,
  talent: ScreeningRoleStepsFragment & ScreeningSectionVisibilityFragment
) => {
  if (!screeningRoleSteps?.length) {
    return false
  }

  if (ALLOWED_STATUSES.includes((talent?.status ?? '').toUpperCase())) {
    return true
  }

  return talent?.specializationApplications?.nodes.some(
    ({ specialization }) => !!specialization
  )
}

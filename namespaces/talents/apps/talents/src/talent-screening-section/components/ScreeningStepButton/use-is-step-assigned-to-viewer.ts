import { useGetCurrentUser } from '@staff-portal/current-user'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'

export const useIsStepAssignedToViewer = (step: ScreeningRoleStepFragment) =>
  step.claimer?.id === useGetCurrentUser()?.id

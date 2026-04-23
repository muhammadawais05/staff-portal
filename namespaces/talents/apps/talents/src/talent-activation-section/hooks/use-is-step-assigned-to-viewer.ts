import { useGetCurrentUser } from '@staff-portal/current-user'
import { ActivationStepFragment } from '@staff-portal/talents'

export const useIsStepAssignedToViewer = ({
  staff: assignee
}: ActivationStepFragment) => assignee?.id === useGetCurrentUser()?.id

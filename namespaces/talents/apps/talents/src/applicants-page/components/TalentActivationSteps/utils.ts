import { isOperationHidden } from '@staff-portal/operations'

import { ActivationStepItemFragment } from './data/get-activation-data/get-activation-data.staff.gql.types'

export const getTooltipMessages = (step: ActivationStepItemFragment) => {
  if (!isOperationHidden(step?.operations?.approve)) {
    return step?.operations?.approve.messages
  }
  if (!isOperationHidden(step?.operations?.assign)) {
    return step?.operations?.assign.messages
  }

  return []
}

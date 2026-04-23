import type { ActionsList } from '@staff-portal/facilities'
import { isOperationHidden } from '@staff-portal/operations'

export const isDropdownVisible = (actionsList: ActionsList) =>
  actionsList.some(
    action => !('operation' in action) || !isOperationHidden(action.operation)
  )

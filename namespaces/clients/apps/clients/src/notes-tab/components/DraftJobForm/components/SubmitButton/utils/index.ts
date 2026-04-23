import { ActionType } from '../../../../../types'

export const loadingState = (
  action: ActionType,
  currentAction: ActionType,
  submitting: boolean
) => submitting && action === currentAction

// eslint-disable-next-line max-params
export const disabledState = (
  action: ActionType,
  currentAction: ActionType,
  submitting: boolean
) => submitting && action !== currentAction

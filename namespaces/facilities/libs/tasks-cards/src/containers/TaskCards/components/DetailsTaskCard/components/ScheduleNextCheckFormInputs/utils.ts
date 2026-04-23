import { ACTION_NEEDED_OPTIONS } from './constants'

export const isActionNeeded = (actionNeeded: string) =>
  actionNeeded === ACTION_NEEDED_OPTIONS.yes.value

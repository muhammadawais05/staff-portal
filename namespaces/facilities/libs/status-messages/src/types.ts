import { StatusMessageFragment } from './data/status-message-fragment'

export interface HiddenStatusMessagesHandler {
  filterOutHiddenMessages: (
    statusMessages: StatusMessageFragment[]
  ) => StatusMessageFragment[]
  hideMessage: (statusMessage: StatusMessageFragment) => void
}

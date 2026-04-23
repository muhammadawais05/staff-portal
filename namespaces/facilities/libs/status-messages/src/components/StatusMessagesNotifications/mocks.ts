import {
  StatusMessageSeverity,
  StatusMessageTag
} from '@staff-portal/graphql/staff'

import { StatusMessageFragment } from '../../data/status-message-fragment'

type Options = {
  text: string
  tag?: StatusMessageTag
  severity?: StatusMessageSeverity
  closeUrl?: string | undefined
}

export const createStatusMessageDataMock = (
  optionalStatusMessage: Options
): StatusMessageFragment => {
  const defaultStatusMessage: StatusMessageFragment = {
    closeUrl: null,
    severity: StatusMessageSeverity.ALERT,
    sticky: false,
    // `tag` should be uniq, or it will throw an error on `key={statusMessage.tag}`
    tag: StatusMessageTag.JOB_ACTIVE_REHIRE,
    text: 'Default status message text',
    storeKey: '',
    data: [],
    __typename: 'StatusMessage'
  }

  return { ...defaultStatusMessage, ...optionalStatusMessage }
}

import {
  StatusMessageSeverity,
  StatusMessageTag
} from '@staff-portal/graphql/staff'

import { StatusMessageFragment } from './status-message-fragment.staff.gql.types'

export const createStatusMessageFragmentMock = (
  partialStatusMessage: Partial<StatusMessageFragment>
): StatusMessageFragment => ({
  closeUrl: 'close',
  severity: StatusMessageSeverity.WARNING,
  text: 'default test status message text',
  storeKey: null,
  tag: StatusMessageTag.ACTIONABLE_ISSUE,
  sticky: false,
  data: [],
  ...partialStatusMessage,
  __typename: 'StatusMessage'
})

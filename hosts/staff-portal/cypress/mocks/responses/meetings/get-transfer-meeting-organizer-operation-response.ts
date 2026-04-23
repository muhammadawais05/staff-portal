import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getTransferMeetingOrganizerOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Meeting',
      id: encodeEntityId('123', 'Meeting'),
      operations: {
        transferMeeting: enabledOperationMock(),
        __typename: 'MeetingOperations'
      }
    }
  }
})

import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getCancelMeetingOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Meeting',
      id: encodeEntityId('123', 'Meeting'),
      operations: {
        cancelMeeting: enabledOperationMock(),
        __typename: 'MeetingOperations'
      }
    }
  }
})

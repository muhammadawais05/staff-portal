import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getFailMeetingOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Meeting',
      id: encodeEntityId('123', 'Meeting'),
      operations: {
        failMeeting: enabledOperationMock(),
        __typename: 'MeetingOperations'
      }
    }
  }
})

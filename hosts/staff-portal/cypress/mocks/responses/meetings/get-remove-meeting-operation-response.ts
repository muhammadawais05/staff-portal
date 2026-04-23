import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getRemoveMeetingOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Meeting',
      id: encodeEntityId('123', 'Meeting'),
      operations: {
        removeMeeting: enabledOperationMock(),
        __typename: 'MeetingOperations'
      }
    }
  }
})
